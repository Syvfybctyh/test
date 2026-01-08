// كائنات المنتجات
const products = [
  {
    title: "xxxxx",
    desc: "xxxx",
    image: "xxxxx"
  },
  {
    title: "xxxxxxx",
    desc: "xxxxxxx",
    image: "xxxxx"
  },
  {
    title: "xxxxxx",
    desc: "xxxxxxx",
    image: "xxxxxx"
  },
  {
    title: "xxxxxx",
    desc: "xxxxxxxx",
    image: "xxxx"
  }
];

// دالة لإنشاء بطاقة منتج
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'course-card';
  card.innerHTML = `
    <div class="course-image">
      <img src="${product.image}" alt="${product.title}" loading="lazy">
    </div>
    <div class="course-content">
      <h3>${product.title}</h3>
      <p>${product.desc}</p>
      <a href="https://wa.me/218928529149?text=${encodeURIComponent(` معلومات عن ${product.title}`)}" 
         class="product-btn" target="_blank">
        <span>اطلب</span>
        
      </a>
    </div>
  `;
  
  return card;
}
// <i class="fab fa-whatsapp"></i>
// إعداد نموذج الواتساب
function setupWhatsAppForm() {
  const form = document.getElementById('whatsappContactForm');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email') || 'لم يحدد';
    const message = formData.get('message');
    
    // الحصول على الزر وعناصر النموذج
    const submitBtn = form.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    // تغيير الزر أثناء المعالجة
    submitBtn.innerHTML = //'<i class="fas fa-spinner fa-spin"></i> جاري التحضير...';
    submitBtn.disabled = true;
    
    // إعداد رسالة الواتساب
    const whatsappMessage = `

الاسم: ${name}
الهاتف: ${phone}
البريد: ${email}

الرسالة:
${message}

التاريخ: ${new Date().toLocaleDateString('ar-LY')}
    `.trim();
    
    // تشفير الرسالة للرابط
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/218928529149?text=${encodedMessage}`;
    
    // فتح الواتساب بعد تأخير قصير
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      
      // إعادة الزر إلى حالته الأصلية
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
      
      // إظهار رسالة نجاح
      showFormMessage('تم تجهيز رسالتك', 'success');
      
      // إعادة تعيين النموذج بعد ثانيتين
      setTimeout(() => {
        form.reset();
      }, 2000);
      
    }, 1000);
  });
}

// دالة لعرض رسائل النموذج
function showFormMessage(message, type = 'info') {
  // إنصراف العنصر إذا لم يكن موجوداً
  let messageDiv = document.getElementById('formMessage');
  
  if (!messageDiv) {
    messageDiv = document.createElement('div');
    messageDiv.id = 'formMessage';
    messageDiv.className = 'form-message';
    document.querySelector('#whatsappContactForm').appendChild(messageDiv);
  }
  
  messageDiv.textContent = message;
  messageDiv.className = `form-message ${type}`;
  messageDiv.style.display = 'block';
  
  // إخفاء الرسالة بعد 5 ثواني
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

// دالة لإضافة تأثيرات على الأزرار
function addButtonEffects() {
  // تأثيرات على أزرار المنتجات
  document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.product-btn')) {
      const btn = e.target.closest('.product-btn');
      btn.style.transform = 'translateY(-3px)';
    }
  });
  
  document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.product-btn')) {
      const btn = e.target.closest('.product-btn');
      btn.style.transform = 'translateY(0)';
    }
  });
}

// دالة لإضافة تأثيرات التمرير السلس
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// دالة لإضافة تأثيرات الظهور
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // مراقبة عناصر المنتجات والمميزات
  document.querySelectorAll('.course-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('products-container');
  
  // ملء بطاقات المنتجات
  if (productsContainer) {
    products.forEach(product => {
      productsContainer.appendChild(createProductCard(product));
    });
  }
  
  setupWhatsAppForm();
  
  addButtonEffects();
  
  setupSmoothScroll();
  
  setupScrollAnimations();
  
  // إضافة تتبع لآخر إرسال (لمنع البريد المزعج)
  // if (typeof localStorage !== 'undefined') {
  //   const lastSubmission = localStorage.getItem('lastContactSubmission');
  //   const submitBtn = document.querySelector('.submit-btn');
    
  //   if (lastSubmission && Date.now() - lastSubmission < 30000) { // 30 ثانية
  //     if (submitBtn) {
  //       submitBtn.disabled = true;
  //       submitBtn.innerHTML = '<span>الرجاء الانتظار 30 ثانية</span>';
        
  //       setTimeout(() => {
  //         submitBtn.disabled = false;
  //         submitBtn.innerHTML = '<span>إرسال عبر واتساب</span><i class="fab fa-whatsapp"></i>';
  //       }, 30000);
  //     }
  //   }
  // }
});

// حفظ وقت آخر إرسال
// function saveSubmissionTime() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lastContactSubmission', Date.now());
  }
// }