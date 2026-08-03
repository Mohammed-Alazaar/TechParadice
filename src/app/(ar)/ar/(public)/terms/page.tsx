import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'
import { BasicPageSchema } from '@/components/seo/PageSchema'
import { BRAND } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'شروط الاستخدام',
  description: `اطّلع على الشروط التي تسري عند الوصول إلى موقع ${BRAND.name} واستخدامه.`,
  path: '/ar/terms',
  alternatePath: '/terms',
  locale: 'ar',
})

export default function ArTermsPage() {
  return (
    <Section tone="void" className="pt-32 sm:pt-40 lg:pt-48">
      <BasicPageSchema
        locale="ar"
        path="/terms"
        type="WebPage"
        name="شروط الاستخدام"
        description="اطّلع على الشروط التي تسري عند الوصول إلى موقع TechParadice واستخدامه."
        crumb="الشروط"
      />
      <div className="mx-auto max-w-reading">
        <p className="text-caption uppercase text-teal">الشؤون القانونية</p>
        <h1 className="mt-3 heading-h1 text-white">شروط الاستخدام</h1>
        <p className="mt-2 text-[13px] text-muted">
          آخر تحديث: 14 يوليو 2026
        </p>
        <div className="mt-10 space-y-6 text-body leading-relaxed text-white/80">
          <p>
            تسري هذه الشروط على وصولك إلى موقع {BRAND.name} واستخدامه. وباستخدام
            الموقع، فإنك توافق على الالتزام بها. أما أعمال العملاء والعروض
            والمدفوعات والمخرجات ومسؤوليات المشروع، فتخضع لاتفاقية خطية منفصلة.
          </p>
          <h2 className="heading-h3 text-white">استخدام الموقع</h2>
          <p>
            يجوز لك استخدام الموقع لأغراض مشروعة، وللتعرّف على خدماتنا أو
            التواصل معنا بشأنها. ولا يجوز لك تعطيل الموقع، أو محاولة الوصول إليه
            دون تصريح، أو إدخال برمجيات خبيثة، أو استخراج بياناته آليًا بطريقة
            تضر بتشغيله، أو إساءة استخدام محتواه أو أنظمته.
          </p>
          <h2 className="heading-h3 text-white">المعلومات المنشورة على الموقع</h2>
          <p>
            نحرص على أن تكون معلومات الموقع واضحة ومحدّثة، إلا أن المحتوى قد
            يتضمن أخطاء أو يصبح قديمًا بمرور الوقت. وتُقدّم المقالات والأمثلة
            والإرشادات العامة لأغراض معلوماتية، ولا تُغني عن مشورة تراعي ظروفك
            الخاصة.
          </p>
          <h2 className="heading-h3 text-white">الملكية الفكرية</h2>
          <p>
            ما لم يُذكر خلاف ذلك، تعود ملكية نصوص الموقع وتصميمه ورسوماته
            وعلامته التجارية وشفرته البرمجية إلى {BRAND.name}، أو تكون مرخّصة
            لها. ويجوز لك الاطلاع عليها لأغراض شخصية أو للتقييم الداخلي لأغراض
            العمل، لكن لا يجوز لك استنساخها أو تعديلها أو توزيعها أو استغلالها
            تجاريًا دون إذن خطي.
          </p>
          <h2 className="heading-h3 text-white">خدمات الجهات الخارجية وروابطها</h2>
          <p>
            قد يتضمن الموقع روابط إلى خدمات تابعة لجهات خارجية أو يعتمد عليها. ولا نتحمل
            مسؤولية محتواها أو توافرها أو أمنها أو شروطها. ويخضع استخدامك لهذه
            الخدمات لسياسات مقدم الخدمة نفسه.
          </p>
          <h2 className="heading-h3 text-white">التوافر وإخلاء المسؤولية</h2>
          <p>
            يُقدّم الموقع على أساس &ldquo;كما هو&rdquo; و&ldquo;حسب التوافر&rdquo;.
            وفي الحدود التي يجيزها القانون، لا نضمن إتاحة الموقع دون انقطاع، أو
            تشغيله من دون أخطاء، أو ملاءمته لغرض بعينه.
          </p>
          <h2 className="heading-h3 text-white">التغييرات على هذه الشروط</h2>
          <p>
            قد نحدّث هذه الشروط عند تغير الموقع أو ممارساتنا. ويبيّن التاريخ
            الوارد أعلاه تاريخ آخر مراجعة. ويعني استمرارك في استخدام الموقع بعد
            أي تحديث أن الشروط المعدّلة تسري على ذلك الاستخدام.
          </p>
          <h2 className="heading-h3 text-white">التواصل معنا</h2>
          <p>
            للاستفسار عن هذه الشروط، راسلنا عبر{' '}
            <a href={`mailto:${BRAND.email}`} className="text-teal hover:underline">
              {BRAND.email}
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  )
}
