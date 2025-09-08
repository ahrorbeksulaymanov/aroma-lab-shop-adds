import { NextRequest, NextResponse } from 'next/server';
import { CheckoutFormData } from '@/types/product';
import { getProductById } from '@/data/products';

export async function POST(request: NextRequest) {
  try {
    const formData: CheckoutFormData = await request.json();
    
    // Validate required fields
    if (!formData.phoneNumber || !formData.fullName || !formData.region || !formData.city) {
      return NextResponse.json(
        { error: 'Barcha maydonlar to\'ldirilishi shart' },
        { status: 400 }
      );
    }

    // Clean and validate phone number
    const phoneRegex = /^[0-9]{9}$/;
    
    if (!phoneRegex.test(formData.phoneNumber)) {
      return NextResponse.json(
        { error: 'Telefon raqam noto\'g\'ri formatda' },
        { status: 400 }
      );
    }

    // Add +998 prefix for display
    const fullPhoneNumber = '+998' + formData.phoneNumber;

    // Get product details
    const product = getProductById(formData.productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Mahsulot topilmadi' },
        { status: 404 }
      );
    }

    // Prepare message for Telegram
    const message = `
🛍️ **Yangi buyurtma**

👤 **Mijoz ma'lumotlari:**
• Ism: ${formData.fullName}
• Telefon: ${fullPhoneNumber}
• Viloyat: ${formData.region}
• Shahar: ${formData.city}

🛒 **Mahsulot ma'lumotlari:**
• Mahsulot: ${product.name}
• Brend: ${product.brand}
• Narx: ${new Intl.NumberFormat('uz-UZ').format(product.price)} so'm
• To'lov usuli: ${formData.paymentMethod === 'full' ? 'To\'liq to\'lov' : `${formData.paymentMethod} oy muddatli to'lov`}

📅 **Buyurtma vaqti:** ${new Date().toLocaleString('uz-UZ', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    })}
    `;

    // Send to Telegram bot
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramBotToken || !telegramChatId) {
      console.error('Telegram bot token yoki chat ID topilmadi');
      return NextResponse.json(
        { error: 'Server konfiguratsiyasi xatosi' },
        { status: 500 }
      );
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API xatosi:', errorData);
      return NextResponse.json(
        { error: 'Telegram botga xabar yuborishda xatolik' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Buyurtma muvaffaqiyatli yuborildi' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Checkout API xatosi:', error);
    return NextResponse.json(
      { error: 'Server xatosi' },
      { status: 500 }
    );
  }
}
