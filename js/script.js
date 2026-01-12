// كائنات المنتجات
const products = [
  {
    title: "سائل تنظيف الأطباق",
    desc: "سائل مركز لتنظيف الأطباق بفعالية عالية، يزيل الدهون والشحوم بسهولة، صديق للبشرة",
    image: "images/dac.jpg"
  },
  {
    title: "منظف الحمامات والمراحيض",
    desc: "منظف قوي خصيصاً للحمامات والمراحيض، يزيل التكلسات والصدأ والبقع العنيدة",
    image: "images/dac.jpg"
  },
  {
    title: "سائل تنظيف الزجاج والنوافذ",
    desc: "سائل تنظيف سريع المفعول يترك زجاجك صافياً ولماعاً بدون خطوط",
    image: "images/dac.jpg"
  },
  {
    title: "مسحوق الغسيل",
    desc: "مسحوق غسيل عالي الجودة ينظف بعمق ويحافظ على ألوان الملابس",
    image: "images/dac.jpg"
  },
    {
    title: "مطهر ومعقم عام",
    desc: "مطهر متعدد الأغراض يقضي على 99.9% من الجراثيم والبكتيريا",
    image: "images/dac.jpg"
  },
];

// بطاقة المنتج
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
      <a href="https://wa.me/218929715758?text=${encodeURIComponent(` معلومات عن ${product.title}`)}" 
         class="product-btn" target="_blank">
        <span>عرض التفاصيل</span>
      </a>
    </div>
  `;
  
  return card;
}

const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const message = formData.get("message");
      // نص الرسالة
      const whatsappMessage = `
      الإسم: ${name}
      رقم الهاتف: ${phone}
      الرسالة: ${message}
      `;
      const whatsappUrl = `https://wa.me/218929715758?text=${whatsappMessage}`;

      window.open(whatsappUrl, "_blank");
    });
  }




// تأثيرات للأزرار
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

// تأثيرات الظهور
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
  
  addButtonEffects();
  
  setupSmoothScroll();
  
  setupScrollAnimations();
  
});