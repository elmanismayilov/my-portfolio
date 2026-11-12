import type { Translation } from "./types";

// Azerbaijani. No glossaries and no quote translations: the interface texts and the customer quotes are already in Azerbaijani.
const az: Translation = {
  site: {
    tagline: "Mürəkkəb şeyləri sadə göstərən rəqəmsal məhsullar dizayn edirəm.",
    location: "Bakı, Azərbaycan",
    mailSubject: "Məhsul dizayneri vakansiyası",
    mailBody: "Salam, Elman,",
  },
  projects: {
    "pasha-life-app": {
      title: "Pasha Life mobil tətbiqi — yenidən dizayn",
      category: "Mobil tətbiq · Sığorta",
      description: "Pasha Life mobil tətbiqinin yenidən dizaynı.",
      summary: {
        facts: [
          ["Rolum", "Məhsul dizayneri"],
          ["Komanda", "Product Owner, biznes analitik, 2 frontend developer, backend developer"],
          ["Müddət", "2 ay"],
        ],
        resultsTitle:
          "Buraxılışdan sonra əsas məhsulumuz HYS-dən əlavə, digər məhsullarımızın müştərilərini də mobil tətbiqə cəlb edə bildik:",
      },
      sections: [
        {
          label: "Problem və məqsəd",
          title: "Tək məhsul məhdudiyyətindən çoxməhsullu ekosistemə",
          blocks: [
            [
              "Hazırkı vəziyyət",
              "Tətbiqin əvvəlki arxitekturası bir məhsula — həyat sığortası (HYS) müqavilələrinə yönəlmişdi. Şirkətin zəngin sığorta portfelinə baxmayaraq, müştərilər tətbiqdə başqa heç bir məhsulu görə bilmirdi.",
            ],
            [
              "Strateji məqsəd",
              "Tətbiqi məhdud çərçivədən çıxarıb **çoxməhsullu platformaya** çevirmək, istifadəçilərə bütün sığorta məhsullarını bir yerdə idarə etmək imkanı vermək.",
            ],
            [
              "Yanaşma",
              "Geniş beyin həmlələrindən və komanda müzakirələrindən sonra kosmetik dəyişikliklərlə kifayətlənməmək qərarına gəldik. Əvəzində geniş miqyaslı yenidən dizaynla tətbiqin UX arxitekturasını sıfırdan yenidən qurduq.",
            ],
          ],
          imageAlt: "Pasha Life-ın əvvəlki tətbiqi: yalnız bir həyat sığortası (HYS) müqaviləsi görünür",
          caption: "Əvvəlki tətbiq — tək HYS müqaviləsi üzərində qurulmuşdu.",
        },
        {
          label: "İstifadəçi səsləri",
          title: "“Mən müştəriyəm — bəs müqaviləm niyə burada yoxdur?”",
          blocks: [
            [
              "Kim",
              "HYS-dən **başqa** istənilən məhsulu olan müştərilər — kredit, ipoteka, korporativ və ya icbari həyat sığortası.",
            ],
            [
              "Problem",
              "Onların **mobil tətbiqə girişi yox idi** və öz müqavilələrinin təfərrüatlarını görə bilmirdilər. Müddəti və ya statusu yoxlamaq üçün yeganə yol çağrı mərkəzinə zəng etmək idi.",
            ],
          ],
          quotes: [{ problem: "Tətbiqə giriş yoxdur" }, { problem: "Müqavilə məlumatları gizlidir" }],
        },
        {
          label: "Benchmark",
          title: "Qlobal təcrübənin təhlili",
          blocks: [
            [
              "Tədqiqat",
              "Öz həllərimizi hazırlamazdan əvvəl çoxməhsullu strukturları idarə edən qlobal bazar liderləri təhlil edildi.",
            ],
            [
              "Fokus",
              "**Revolut** kimi fintex nəhənglərinin mürəkkəb ekosistemləri necə sadələşdirdiyini öyrənərək ən təsirli UX nümunələrini müəyyən etdik.",
            ],
            [
              "Nəticə",
              "Qlobal standartları daxili biznes tələblərimizə uyğunlaşdırdıq və rahat, **miqyaslana bilən arxitektura modeli** formalaşdırdıq.",
            ],
          ],
          imageAlt:
            "Revolut, Unibank, ABB, Birbank və Tinkoff-un məhsulları necə təqdim etdiyini müqayisə edən benchmark cədvəli",
          caption: "Benchmark: Revolut, Unibank, ABB, Birbank və Tinkoff yan-yana müqayisədə.",
        },
        {
          label: "Wireframe-lər",
          title: "İdeyaların iki wireframe konsepti ilə sınanması",
          blocks: [
            ["Yanaşma", "İdeyaları sınamaq üçün **2 fərqli wireframe konsepti** hazırlandı."],
            ["Müqayisə", "Hər variantın UX üstünlükləri və riskləri ayrıca təhlil edildi."],
            [
              "Təfərrüatlar",
              "Komanda ilə müzakirəni asanlaşdırmaq üçün bütün qeydlər birbaşa ekranların üzərinə yerləşdirildi.",
            ],
            [
              "Qərar",
              "**Konsept 02** seçildi. Müqavilələr **üfüqi** istiqamətdə sürüşdürülür, əməliyyatlar və müqavilə məlumatları isə birbaşa onların altında yerləşir.",
            ],
            [
              "Niyə: tanışlıq",
              "Bu yanaşma **müştərilərimiz üçün daha tanış idi**. Onlar tətbiqdən artıq 2 ildir istifadə edirdilər və bu tətbiq ətrafında istifadəçi təcrübəsi formalaşmışdı.",
            ],
            [
              "Niyə: aşağı risk",
              "Bu, **yüksək NPS göstəricilərimiz üçün risksiz seçim** idi — istifadəçilərin bəyəndiyini pozmadan tətbiqi inkişaf etdirə bilərdik.",
            ],
            [
              "Niyə: arxitektura",
              "**Arxitektura baxımından hər şey düzgün idi** — struktur yeni məhsullara təbii şəkildə miqyaslanır.",
            ],
          ],
          gallery: [
            {
              alt: "Wireframe konsepti 1: məhsul siyahısı olan ana ekran və məhsul təfərrüatı ekranları",
              caption: "Konsept 01",
            },
            {
              alt: "Wireframe konsepti 2: müqavilə filtrləri olan ana ekran, bütün müqavilələrin siyahısı və məhsul təfərrüatı",
              caption: "Konsept 02",
            },
          ],
        },
        {
          label: "Yekun vizual konsept",
          title: "Müasir, miqyaslana bilən vizual dil",
          blocks: [
            [
              "İcra",
              "Sınaqdan keçirilmiş wireframe-lər əsasında tətbiqin **yeni vizual konsepti** tamamlandı.",
            ],
            [
              "Həll",
              "Müasir estetikaya və aydın vizual iyerarxiyaya malik **miqyaslana bilən dizayn sistemi** yaratdıq.",
            ],
          ],
          imageAlt:
            "Yekun vizual konsept: aktiv müqavilə kartı və dondurulmuş müqavilə kartı olan yenilənmiş ana ekran",
          caption: "Yekun ana ekran — aktiv və dondurulmuş müqavilə vəziyyətləri.",
        },
        {
          label: "Dizayn sistemi",
          title: "Hər məhsul üçün vahid sistem — açıq və tünd temada",
          blocks: [
            [
              "Primitivlər",
              "Əsasda **80 rəng primitivi** durur — hər biri 10 pilləli 8 palitra. İnterfeysdə heç bir yerdə xam rəngdən istifadə olunmur.",
            ],
            [
              "Tokenlər",
              "Onların üzərində **24 semantik token** yerləşir — səth, etiket, ayırıcı, status, indikator, məlumat. Hər birinin **Light və Dark dəyəri** var, ona görə temanı dəyişmək sadəcə tokenləri başqa primitivlərə yönləndirir.",
            ],
            [
              "Məhsullar",
              "Məhsulun hər vəziyyətinin — aktiv, dondurulmuş, bitmiş, ləğv olunmuş, təsdiqdə — öz status tokeni var, HYS-in bənövşəyisi kimi məhsul vurğuları isə ayrıca tokenlərdə saxlanılır.",
            ],
          ],
        },
        {
          label: "Məhsulların fərqləndirilməsi",
          title: "Birinci çağırış: məhsulları bir baxışda fərqləndirmək",
          blocks: [
            [
              "Problem",
              "Parametrləri bu qədər fərqli olan məhsulları təmsil etmək üçün tək kart dizaynı kifayət deyildi.",
            ],
            [
              "UX həlli",
              "**Məhsulları rənglə tanıdan vizual sistem** qurulub — sürüşdürərkən istifadəçilər hansı məhsulun müqaviləsinə baxdıqlarını intuitiv olaraq başa düşürlər.",
            ],
          ],
          gallery: [
            {
              alt: "Səkkiz müqavilə kartı: hər məhsulun öz rəngi və fon naxışı var",
              caption: "Kart sistemi — hər məhsul üçün bir rəng",
            },
            {
              alt: "Müqavilə kartları arasında sürüşdürmə: hər məhsul öz rəngində göstərilir",
              caption: "Hərəkətdə — məhsullar arasında sürüşdürmə",
            },
          ],
        },
        {
          label: "Üfüqi sürüşdürmə yorğunluğu",
          title: "İkinci çağırış: üfüqi sürüşdürmə yorğunluğunun aradan qaldırılması",
          blocks: [
            [
              "Problem",
              "Çoxlu müqaviləsi olan istifadəçilər üçün üfüqi sürüşdürmə vaxt itkisi və yorğunluq demək idi.",
            ],
            [
              "UX həlli",
              "**“Hamısına baxın”** funksiyasını əlavə etməklə naviqasiya məsafəsini qısaltdıq — istifadəçilər indi istənilən müqaviləyə cəmi **2 kliklə** çatır.",
            ],
          ],
          reveal: {
            alt: "“Bütün müqavilələrim” ekranı: müqavilələr məhsullar üzrə qruplaşdırılıb və məhsulun rəngi ilə işarələnib",
            caption: "“Hamısına baxın” — bütün müqavilələr məhsullar üzrə qruplaşdırılıb, iki toxunuşla əlçatandır.",
          },
        },
        {
          label: "İstifadə rahatlığı testi",
          title: "Fərziyyələrimizin real istifadəçilər qarşısında sınanması",
          blocks: [
            [
              "Hipotez",
              "Bütün UX həllərimiz istifadəçilər qarşısında sınaqdan keçirilməli olan **fərziyyələr** idi.",
            ],
            ["Test", "Real müştərilərlə **üzbəüz istifadə rahatlığı testləri** təşkil etdik."],
            ["Dayanma şərti", "**5 istifadəçi testi uğurla tamamlayana qədər** test aparmağa davam etdik."],
            [
              "İterasiyalar",
              "Bu mərhələdə tez-tez **interfeysi yenidən işləməli** olurduq — düzəlt, yeni istifadəçilərlə yenidən sına və təkrarla.",
            ],
            [
              "Nəticə",
              "Topladığımız **keyfiyyət əsaslı rəy** əsasında interfeysdəki uyğunsuzluqları aradan qaldırdıq.",
            ],
          ],
          reveal: {
            alt: "Çap olunmuş istifadə rahatlığı testi vərəqləri: testdən əvvəlki anket, tapşırıqlar siyahısı və əl ilə yazılmış qeydləri olan qiymətləndirmə sualı",
            caption: "Üzbəüz test vərəqləri — anket, tapşırıqlar və əl ilə yazılmış rəylər.",
          },
        },
        {
          label: "Növbəti addımlar",
          title: "Tətbiq dayanmır",
          blocks: [
            ["İnkişaf", "Tətbiqə daim yeni funksiyalar və yeni məhsullar əlavə olunur."],
            [
              "Arxitektura",
              "**Düşünülmüş arxitektura** sayəsində istənilən yeni məhsulu asanlıqla təqdim edə bilirik — o, sadəcə yeni müqavilə kartına və məhsul kataloqunda yeni bir sətrə çevrilir.",
            ],
            [
              "Ən son məhsul",
              "Ən son əlavə olunan məhsul **GüclüSən**-dir — o, artıq ana ekranda yerləşir və kataloqun ən başında “yeni” işarəsi ilə göstərilir.",
            ],
          ],
          newProduct: {
            homeAlt: "GüclüSən müqavilə kartı, sürətli əməliyyatlar və təminat təfərrüatları olan ana ekran",
            homeCaption: "Ana ekran — GüclüSən müqaviləsi",
            catalogAlt:
              "Sığorta məhsulları kataloqu: yuxarıda “yeni” işarəli GüclüSən, ardınca yığım, kredit və şəxsi məhsullar",
            catalogCaption: "Kataloq — GüclüSən yenidir",
          },
        },
        {
          label: "Biznes təsiri",
          title: "Metriklərlə təsdiqlənib",
          blocks: [
            ["Məlumatla təsdiq", "Yeni UX həlləri real analitikada **özünü tam doğrultdu**."],
            [
              "Metrik",
              "Aktiv istifadəçilərin sayında (MAU/DAU) **sabit və ardıcıl artım** müşahidə edirik.",
            ],
            [
              "Nəticə",
              "Yeni arxitektura istifadəçilərə **digər sığorta məhsullarını kəşf etməyi və istifadə etməyi** asanlaşdırdı.",
            ],
          ],
          usersByProduct: {
            totalLabel: "digər məhsullarımızın aktiv istifadəçisi",
            asOf: "Məlumatlar 6 noyabr 2026-cı il tarixinə",
          },
        },
      ],
    },

    "contract-payout": {
      title: "Ödəniş müraciətlərinin 30%-ni necə onlayna keçirdik",
      category: "Mobil tətbiq · Sığorta",
      description: "Aylıq ödəniş müraciətlərinin 30%-i buraxılışdan sonra 3 ay ərzində tətbiqə keçdi.",
      summary: {
        facts: [
          ["Rolum", "Məhsul dizayneri"],
          ["Komanda", "Product Owner, biznes analitik, 2 frontend developer, backend developer"],
          ["Müddət", "1 sprint"],
          ["Platforma", "Mobil tətbiq"],
          ["Buraxılış", "İyul 2025"],
          ["Nəticə", "Aylıq ödəniş müraciətlərinin **30%-i** indi mobil tətbiq vasitəsilə daxil olur"],
        ],
      },
      sections: [
        {
          label: "Problem və giriş nöqtəsi",
          title: "Oflayn müraciətdən avtomatlaşdırılmış rəqəmsal həllə",
          blocks: [
            [
              "Problem",
              "Ən vacib əməliyyatlardan biri — **sığorta ödənişi müraciəti** — tətbiqdə ümumiyyətlə yox idi. İstifadəçilər çağrı mərkəzinə zəng etməli və mürəkkəb, vaxt aparan oflayn prosedurlardan keçməli idilər.",
            ],
            ["Həll", "Müraciət prosesini tam rəqəmsallaşdırdıq və birbaşa tətbiqin içinə yerləşdirdik."],
            [
              "Ağıllı giriş nöqtəsi",
              "Giriş nöqtəsi birbaşa məhsul kartında, istifadəçilərin müqaviləsinə baxdığı yerdədir — onu tətbiqin içində axtarmağa ehtiyac yoxdur.",
            ],
            [
              "Kontekstual giriş",
              "Məhsul kartına müqavilənin bitməsinə qalan vaxtı göstərən **proqres bar** yerləşdirdik. Müqavilə müddəti tamamlananda bar avtomatik olaraq əsas əməliyyat düyməsinə — **“Yığılmış məbləği əldə et”** düyməsinə çevrilir.",
            ],
          ],
          payoutMorph: {
            before: {
              alt: "Həyat sığortası kartında proqres bar və 500 gün qalıb göstərilən ana ekran",
              caption: "1–35-ci aylar — proqres",
            },
            after: {
              alt: "Proqres barın “Yığılmış məbləği əldə et” düyməsinə çevrildiyi ana ekran",
              caption: "Son ay — əsas əməliyyat düyməsi (CTA)",
            },
          },
        },
        {
          label: "Məlumatların daxil edilməsi",
          title: "Əl ilə daxiletmə və Açıq Bankçılıq",
          blocks: [
            [
              "Çətinlik",
              "Bank rekvizitlərini (IBAN, filial, kart nömrəsi) əl ilə daxil etmək vaxt aparır və istifadəçi tərəfdən **mexaniki səhv** ehtimalını artırırdı.",
            ],
            [
              "Həll",
              "Sistemə **Açıq Bankçılıq** inteqrasiyasını gətirdik. Bir kliklə razılıq verməklə istifadəçilər bank məlumatlarını avtomatik çəkə bilirlər.",
            ],
            [
              "Seçim azadlığı",
              "İstifadəçilərə iki alternativ yol təqdim etdik — **“Əl ilə daxil etmək”** və ya **“Avtomatik (Açıq Bankçılıq)”**.",
            ],
          ],
          tallShot: {
            alt: "Əl ilə daxiletmə ilə Açıq Bankçılıq vasitəsilə avtomatik daxiletmə arasında keçid olan ödəniş müraciəti ekranı",
            caption: "Məlumatların necə daxil ediləcəyini seçin — əl ilə və ya avtomatik",
          },
          flowReveal: {
            alt: "Ödəniş müraciətinin istifadəçi axını: yoxlama xətaları ilə əl ilə daxiletmə və bank seçimi və hesab ekranları olan Açıq Bankçılıq qolu",
            caption: "İstifadəçi axını — əl ilə daxiletmə və Açıq Bankçılıq qolları",
          },
        },
        {
          label: "Statusun izlənməsi",
          title: "Şəffaflıq: müraciətin statusunun izlənməsi",
          blocks: [
            [
              "Narahatlığın azaldılması",
              "Müraciət göndərildikdən sonrakı qeyri-müəyyənliyi aradan qaldırmaq üçün **real vaxt rejimində, addım-addım status izləmə** (timeline) interfeysi hazırlandı.",
            ],
            [
              "Operativ rəy",
              "Sənəd çatışmadıqda və ya məlumatı dəqiqləşdirmək lazım olduqda (məsələn, **“Çatışmayan sənəd var”** bildirişi) istifadəçiyə dərhal xəbər verilir.",
            ],
            [
              "Sənədlərə çıxış",
              "Müraciət forması və lazımi ərizələr (**“Sığorta ödənişinin alınması ərizəsi”**) birbaşa interfeysdən PDF formatında yüklənə bilər.",
            ],
            [
              "Biznes təsiri",
              "Çağrı mərkəzinə gələn **“Ödənişim haradadır?”** zənglərinə indi tətbiqin özü cavab verir.",
            ],
          ],
          statusTimeline: {
            alt: "Status xətti olan müraciət təfərrüatları ekranı: çatışmayan sənəd xəbərdarlığı, müraciət qəbul edildi, ödəniş hazırlanır, ödəniş həyata keçirildi",
            caption: "Status xətti — addım-addım",
          },
        },
        {
          label: "Kənar hallar",
          title: "Yalnız ideal ssenari deyil",
          blocks: [
            [
              "İdeal ssenaridən kənarda",
              "Ödəniş müraciəti həmişə problemsiz keçmir. Onun ətrafındakı vəziyyətlər də dizayn edildi ki, istifadəçi həmişə **harada olduğunu və növbəti addımın nə olduğunu** bilsin.",
            ],
            [
              "Vəziyyətlər",
              "Müqavilə hələ tamamlanmayıb, müraciət rədd edilib, sənəd yenidən tələb olunub və ödəniş həyata keçirilib. Ekrana baxmaq üçün vəziyyəti seçin.",
            ],
          ],
        },
        {
          label: "Təsir və nəticələr",
          title: "Aylıq ödəniş müraciətlərinin 30%-i artıq tətbiqdədir",
          blocks: [
            [
              "Mənimsənilmə",
              "2025-ci ilin iyulundakı buraxılışdan sonra 3 ay ərzində tətbiqin **aylıq** ödəniş müraciətlərindəki payı **12%**-dən **30%**-ə yüksəldi.",
            ],
            [
              "Marketinq",
              "Buraxılış marketinq strategiyası ilə — **push bildirişlər, sosial şəbəkə videoları** və digər kanallarla — dəstəkləndi, məhsul kartındakı giriş nöqtəsi isə funksiyanı daim istifadəçilərin gözü qarşısında saxladı.",
            ],
            [
              "Əməliyyat yükü",
              "Müraciətlər getdikcə daha çox özünəxidmətə keçdikcə çağrı mərkəzinin və əməliyyat komandasının yükü azalır.",
            ],
            [
              "Biznes səmərəliliyi",
              "İstifadəçi vərdişlərini oflayndan rəqəmsala dizayn və inkişafın cəmi **bir sprinti** ərzində dəyişdik.",
            ],
          ],
        },
        {
          label: "Növbəti addımlar",
          title: "Müraciətlərin 70%-i hələ də oflayndır",
          blocks: [
            [
              "İmkan",
              "Funksiya işləyir, lakin ödəniş müraciətlərinin çoxu hələ də çağrı mərkəzindən keçir. Bu, ən böyük inkişaf imkanıdır.",
            ],
            [
              "Plan",
              "Məqsəd onları **istifadəçilərlə doğru anda görüşməklə** və qalan son əngəlləri aradan qaldırmaqla cəlb etməkdir.",
            ],
          ],
          nextSteps: {
            ideas: [
              {
                title: "Müddət bitərkən xatırlatma",
                text: "Müqavilə müddətinin bitməsinə bir neçə ay qalmış, bir ay qalmış və son gün push və SMS — birbaşa müraciət formasına aparan dərin keçidlə (deep link).",
              },
              {
                title: "Əvvəlcədən doldurulmuş forma",
                text: "Bank rekvizitləri Açıq Bankçılıq vasitəsilə, şəxsi məlumatlar isə profildən defolt olaraq gətirilsin ki, müraciət cəmi bir neçə toxunuş çəksin.",
              },
              {
                title: "Çağrı mərkəzindən yönləndirmə",
                text: "Müştəri zəng edəndə operator keçid göndərir və müraciət telefonla deyil, tətbiqdə davam edir.",
              },
              {
                title: "Mərhələlər üzrə itkiləri ölçmək",
                text: "Giriş nöqtəsi, forma və göndər düyməsi arasında istifadəçilərin harada ayrıldığını izləmək və əvvəlcə ən zəif addımı yaxşılaşdırmaq.",
              },
            ],
          },
        },
      ],
    },

    "nps-redesign": {
      title: "NPS sorğusunun yenidən dizaynı",
      category: "Veb platforma · Sığorta",
      description: "Təsadüfi aşağı qiymətlərin aradan qaldırılması — göstəricilərdə 25% artım.",
      summary: {
        facts: [
          ["Rolum", "Məhsul dizayneri — problemin təhlili, istifadəçi axını və UI mənim üzərimdə idi"],
          ["Komanda", "CX komandası, Product Owner, frontend və backend developerlər"],
          ["Müddət", "2 sprint"],
          ["Platforma", "Veb platforma (müştəri kabineti)"],
          ["Buraxılış", "Oktyabr 2025"],
          ["Nəticə", "NPS göstəricilərində **+25%** artım və nəhayət aşağı qiymətləri izah edən sorğu"],
        ],
      },
      sections: [
        {
          label: "Problem",
          title: "Bəzi istifadəçilər niyə bizə “təsadüfən” aşağı qiymət verirdi?",
          blocks: [
            [
              "Kəşf",
              "NPS sorğumuzu təhlil edərkən çox qəribə bir qanunauyğunluğu gördük. Bəzi istifadəçilər bizə aşağı qiymət verirdi. Lakin CX komandamız onlarla əlaqə saxlayanda hər dəfə eyni cavabı eşidirdi: **“Aa, bu təsadüf oldu. Əslində məhsuldan razıyam!”**",
            ],
            [
              "Miqyas",
              "CX komandası aşağı qiymət vermiş müştərilərə zəng etdi. Cavab təkrarlanırdı: **onların çoxu qiymətin səhv olduğunu deyirdi.** Bunlar bir neçə qəribə hal deyildi — qanunauyğunluq idi.",
            ],
            [
              "Müəmma",
              "Bu, mənim üçün əsl UX müəmması oldu. Kimsə necə təsadüfən pis qiymət verə bilər? Bu, problemin istifadəçidə deyil, dizaynın özündə olduğunu göstərən aydın siqnal idi. Dizayn “avtopilot” səhvlərinə səbəb olur və “çirkli” məlumatlara gətirib çıxarırdı.",
            ],
            [
              "Qərar",
              "Problemi öz üzərimə götürdüm və **axını əvvəldən axıra qədər yenidən işlədim**. CX komandası müştəri zənglərini və rəylərini gətirdi, developerlər isə kabinetdə nəyin mümkün olduğunu müəyyən etdilər.",
            ],
            [
              "Aqressiv müdaxilə",
              "Sorğu tam ekran modal pəncərə kimi çıxır və interfeysi tamamilə bloklayırdı. Bu, istifadəçini işinin ortasında kəsir və ani əsəbilik yaradırdı.",
            ],
            [
              "Zəif əks-əlaqə",
              "“6” (mənfi) ilə “7” (neytral) arasındakı rəng kontrastı demək olar ki, hiss olunmurdu. “Yaşıl zonanı” hədəfləyən “avtopilot” rejimindəki istifadəçi bunu hətta fərqinə varmadan asanlıqla səhv edə bilərdi.",
            ],
            [
              "Dayaq və kontekst yoxdur",
              "Rəqəmlər sadəcə rəqəm idi. İstifadəçiyə heç bir dayaq nöqtəsi (məsələn, “0 = Qətiyyən yox”, “10 = Mütləq”) verilmirdi və seçimi təsdiqlənmirdi. “5” ümumiyyətlə nə demək idi? Bu, aydın deyildi.",
            ],
            [
              "Qaçırılmış imkan",
              "Narazı istifadəçilərdən heç vaxt “Niyə?” soruşmurduq. Pis qiymət alırdıq, lakin bu mənfi rəyin arxasındakı səbəblər haqqında heç bir məlumatımız yox idi.",
            ],
            ["Yekun", "Aydın idi ki, **istifadəçiyə hörmətə əsaslanan** tam yenidən dizayn lazımdır."],
          ],
          imageAlt:
            "Köhnə NPS sorğusu: qaralmış interfeysin üzərində 0-dan 10-a qədər rəqəmlər cərgəsi olan tam ekran modal pəncərə",
          caption: "Köhnə sorğu — bütün interfeysi bloklayan modal pəncərə.",
        },
        {
          label: "Wireframe-lər",
          title: "Seçməzdən əvvəl variantların araşdırılması",
          blocks: [
            [
              "Yanaşma",
              "İş ilk ideyaların wireframe-lərdə hazırlanması ilə başladı. Hətta bu erkən mərhələdə də bunun sadəcə **“düymənin yenidən dizaynı”** olmadığı aydın idi.",
            ],
            [
              "Üç qərar",
              "Sorğuya üç ayrı dizayn qərarı kimi yanaşdım — **harada yerləşir, şkala necə görünür və nə vaxt çıxır** — və hər biri üçün variantları müqayisə etdim.",
            ],
          ],
          imageAlt: "Yeni NPS axınının çap olunmuş wireframe vərəqləri, markerlərlə əl ilə rənglənib",
          caption: "Wireframe-lər — yeni NPS axını üçün ilk ideyalar.",
          decisions: [
            {
              question: "Sorğu harada yerləşir?",
              options: [
                {
                  name: "Tam ekran modal pəncərə",
                  note: "Köhnə üsul. Tapşırığı bloklayır və əsəbi istifadəçini cavab verməyə məcbur edir.",
                },
                {
                  name: "Küncdə widget",
                  note: "Mane olmur və seçimi istifadəçiyə buraxır. Səhifə altında işləməyə davam edir.",
                },
                {
                  name: "Üstdə banner",
                  note: "Maketi aşağı itələyir və daha bir reklam zolağı kimi asanlıqla nəzərə alınmır.",
                },
              ],
            },
            {
              question: "Şkala necə görünür?",
              options: [
                {
                  name: "Emoji simalar",
                  note: "Mehribandır, lakin beş sima NPS üçün lazım olan 0–10 dəqiqliyini verə bilməz.",
                },
                {
                  name: "Sürüşdürücü",
                  note: "Siçan və ya barmaqla səhv təyin etmək asandır, yekun dəyər isə aydın görünmür.",
                },
                {
                  name: "0–10 düymələri",
                  note: "Standart NPS şkalası: nəticələr tariximizlə müqayisə oluna bilən qalır. Aydınlığı rəng və etiketlər təmin edir.",
                },
              ],
            },
            {
              question: "Nə vaxt çıxır?",
              options: [
                {
                  name: "Hər girişdə",
                  note: "Proqnozlaşdırılandır, lakin insanları qiymətləndirəcək heç nə etmədən tutur.",
                },
                {
                  name: "Səhifə oturuşandan sonra",
                  note: "İstifadəçi səhifəyə düşdükdən bir neçə saniyə sonra və heç vaxt formanın və ya ödənişin ortasında deyil.",
                },
                {
                  name: "Təsadüfi anda",
                  note: "Hazırlamaq ucuzdur, lakin insanları ən pis vaxtda kəsməyə davam edir.",
                },
              ],
            },
          ],
        },
        {
          label: "Təqdimat",
          title: "Sorğunun necə və nə vaxt təqdim olunduğunu dəyişirik",
          blocks: [
            [
              "Problem",
              "İstifadəçilərin bunun üçün vaxt sərf etmək həvəsi onsuz da çox azdır. Köhnə yanaşmamız **onların işini kəsirdi**, yəni biz praktiki olaraq artıq əsəbiləşmiş adamdan cavab almağı təmin edirdik.",
            ],
            [
              "Həll",
              "Yeni dizaynda sorğumuz aşağı sağ küncdə kiçik, narahat etməyən widget kimi görünür. **Artıq istifadəçinin axınını kəsmirik.** İstifadəçi nə vaxt (və ya cavab verib-verməyəcəyini) özü qərara alır, bu da məlumatlarımızın səmimiliyinə və keyfiyyətinə böyük müsbət təsir göstərir.",
            ],
            [
              "Nə vaxt çıxır",
              "Müştəri ana səhifəyə düşdükdən təxminən **10 saniyə** sonra — və heç vaxt forma doldurarkən və ya ödəniş edərkən deyil.",
            ],
            [
              "Nə qədər tez-tez",
              "Müştəri başına ən çox **90 gündə bir dəfə**, beləliklə sorğu sual olaraq qalır, heç vaxt əziyyətə çevrilmir.",
            ],
            ["Bağlanarsa", "✕ düyməsinə basmağa hörmət olunur: müştəridən **30 gün ərzində yenidən soruşulmur**."],
            [
              "Nəzərə alınmazsa",
              "Nəzərə alınmayan widget 30 saniyədən sonra kiçik tab şəklində qatlanır və növbəti ziyarətdə, bir dövrdə **3 dəfəyə** qədər qayıda bilər. Sonra növbəti dövrü gözləyir.",
            ],
            [
              "Mobildə",
              "Dar ekranlarda küncdəki widget daha böyük toxunma sahələri olan **alt panelə (bottom sheet)** çevrilir ki, barmaq düzgün rəqəmə dəyə bilsin.",
            ],
          ],
          imageAlt: "Yeni NPS sorğusu veb kabinetin aşağı sağ küncündə kiçik widget kimi",
          caption: "Yeni sorğu — küncdə kiçik widget.",
        },
        {
          label: "Yeni dizayn",
          title: "Yeni dizaynın təhlili",
          blocks: [
            [
              "6 və 7",
              "Köhnə dizaynda yumşaq gradient var idi, lakin “6” ilə “7” arasındakı kontrast demək olar ki, görünmürdü. Avtopilotdakı istifadəçi üçün real fərq yox idi — NPS göstəricimiz üçün isə bu kritikdir: 6 tənqidçi (Detractor), 7 isə neytraldır (Neutral). Aydın, yüksək kontrastlı rəng qrupları yaratdıq: **Qırmızı (0–6), Sarı (7–8) və Yaşıl (9–10).** Artıq çaşqınlıq yoxdur.",
            ],
            [
              "Qiymətin izahı",
              "Dəfələrlə “Qiymət 5-dir, amma məhsuldan razıyam!” kimi rəylər eşidirdik. İstifadəçilər şkalanı anlamırdı. Bunu aradan qaldırmaq üçün iki kontekst qatı əlavə etdik.",
            ],
            ["Mətn dayaqları", "**“0”** və **“10”** altındakı etiketlər şkalanın iki ucunu müəyyən edir."],
            [
              "Ani əks-əlaqə",
              "İstifadəçi rəqəmə kliklədikdən sonra onun üstündə aydın status etiketi (“Narazı”, “Neytral” və ya “Əla”) göstəririk ki, onun səsinin nə demək olduğuna **heç bir şübhə qalmasın**.",
            ],
            [
              "“Niyə”nin öyrənilməsi",
              "Sadəcə aşağı qiymət almaq kifayət deyil — səbəbi bilmək lazım idi. İstifadəçi 0–6 arası qiymət seçəndə istəyə görə tez-tez rast gəlinən problemlərlə bir neçə seçim xanası və öz rəyi üçün sahə göstəririk. Bu, rəqəmə sadəcə baxmaq əvəzinə problemləri həqiqətən düzəltmək üçün **tətbiq oluna bilən nəticələr** verir.",
            ],
            [
              "Əlçatanlıq: yalnız rənglə deyil",
              "Rəng heç vaxt yeganə siqnal deyil. Hər qrup mətnlə də izah olunur — şkalanın altındakı iki dayaq və seçimdən sonra çıxan status etiketi (“Narazı”, “Neytral”, “Əla”).",
            ],
            [
              "Məlum çatışmazlıq: rəqəm kontrastı",
              "Rəngli dairələri yoxlayanda zəif nöqtə rəqəmlərdir. Ağ fonda nazik sarı rəqəmlər (7–8) WCAG AA-nın 4,5:1 nisbətindən xeyli aşağıdır, qırmızı və yaşıl isə sərhəddədir. **Növbəti addım: rəqəm rəngini tündləşdirmək və daha açıq konturu saxlamaq.**",
            ],
          ],
          gallery: [
            {
              alt: "Yeni NPS şkalası: 0 və 10-un altında mətn dayaqları olan qırmızı, sarı və yaşıl rəqəm qrupları",
              caption: "Rəng qrupları və mətn dayaqları",
            },
            {
              alt: "0 seçildikdən sonra sorğu “0 - NARAZI” statusunu, seçim üçün səbəbləri və sərbəst mətn sahəsini göstərir",
              caption: "Ani əks-əlaqə və aşağı qiymətin səbəbi",
            },
          ],
        },
        {
          label: "Əvvəl və sonra",
          title: "Dörd düzəliş, yan-yana",
          blocks: [
            [
              "Bir baxışda",
              "Hər düzəliş təsadüfi qiymətlərin bir səbəbinə cavab verir. Solda köhnə versiya, sağda yenisi yerləşir.",
            ],
          ],
          beforeAfter: [
            {
              title: "Müdaxilə → sakit widget",
              note: "Bloklayan tam ekran modal pəncərə küncdəki kiçik widget-ə çevrildi.",
              beforeAlt: "Köhnə sorğu: qaralmış kabinetin üzərində tam ekran modal pəncərə",
              afterAlt: "Yeni sorğu: kabinetin küncündə kiçik widget",
            },
            {
              title: "Solğun gradient → aydın rəng qrupları",
              note: "6 (tənqidçi) və 7 (neytral) artıq bir-birinə qarışdırıla bilməz.",
              beforeAlt: "Köhnə şkala: qırmızıdan yaşıla yumşaq gradientli on dairə",
              afterAlt: "Yeni şkala: qırmızı 0–6, sarı 7–8, yaşıl 9–10",
            },
            {
              title: "Çılpaq rəqəmlər → dayaqlar və ani əks-əlaqə",
              note: "Şkalanın hər iki ucu adlandırılıb, seçilmiş qiymət isə status etiketi alır.",
              beforeAlt: "Köhnə şkala: mənalarını izah edən heç nə olmayan rəqəmlər",
              afterAlt: "Yeni şkala: “0 - NARAZI” etiketi, şkalanın özü və 0 ilə 10-un altında mətn dayaqları",
            },
            {
              title: "Səbəb yoxdur → istəyə bağlı “niyə”",
              note: "Aşağı qiymətlər indi komandanın üzərində işləyə biləcəyi səbəblərlə gəlir.",
              beforeAlt: "Köhnə sorğu səbəb barədə sual olmadan yalnız bir göndər düyməsi ilə bitir",
              afterAlt: "Yeni sorğu səbəbi seçim xanaları və sərbəst mətn sahəsi ilə soruşur",
            },
          ],
        },
        {
          label: "Ölçmə",
          title: "İşləyib-işləmədiyi necə qiymətləndirildi",
          blocks: [
            [
              "Dürüst məhdudiyyətlər",
              "Köhnə və yeni sorğu heç vaxt paralel işləmədi, ona görə bu, **A/B testi deyil, “əvvəl / sonra” müqayisəsidir**. Eyni aylarda məhsulda başqa şeylər də dəyişdi.",
            ],
            [
              "Nələrə baxdım",
              "Buraxılışdan əvvəl və sonra NPS trendinə, cavab verənlərin payına, neçə aşağı qiymətin səbəbinin göstərildiyinə və CX komandasının sonrakı zənglərdə nə eşitdiyinə baxdım.",
            ],
            [
              "Niyə buna inanıram",
              "Əsas siqnal ən sadəsi oldu: müştərilərin “bu təsadüf idi” dediyi zənglər əsas mövzu olmaqdan çıxdı. Rəqəmlər və söhbətlər eyni istiqaməti göstərirdi.",
            ],
          ],
        },
        {
          label: "Nəticə",
          title: "Təmiz məlumat, real qərarlar",
          blocks: [
            [
              "Təsir",
              "Təsadüfi aşağı qiymətləri aradan qaldıraraq NPS göstəricilərimizin etibarlılığını bərpa etdik. İndi PASHA Life strateji məhsul qərarlarını interfeys maneəsinə deyil, **həqiqi istifadəçi rəyinə** əsasən verir.",
            ],
            [
              "İstifadədə olan məlumat",
              "Ən güclü sübut qiymət deyil — yeni “niyə” sahəsinin komandanın artıq verdiyi bir **qərarı dəyişdirməsidir**.",
            ],
          ],
        },
        {
          label: "Çıxarışlar",
          title: "Nə öyrəndim və nəyi fərqli edərdim",
          blocks: [
            [
              "Öyrəndim: dizayn",
              "Pis məlumat çox vaxt **istifadəçi problemi deyil, dizayn problemidir**. İnsanlar “təsadüfən” yanlış cavab verirsə, əvvəlcə interfeysə baxın.",
            ],
            [
              "Öyrəndim: “niyə”",
              "Tək rəqəm komandaya kömək etmir. Rəqəmin yanındakı “niyə” qiyməti qərara çevirir.",
            ],
            [
              "Fərqli: test",
              "Yeni sorğunu birdən köhnənin yerinə qoymaq əvəzinə onunla müqayisədə **A/B testi** edərdim. Bu, təmiz, səbəb-nəticə əlaqəli rəqəm verərdi.",
            ],
            [
              "Fərqli: başlanğıc göstəricilər",
              "Uğur metriklərini CX komandası ilə razılaşdırar və başlanğıc göstəriciləri buraxılışdan **sonra** deyil, **əvvəl** qeyd edərdim.",
            ],
            [
              "Fərqli: mobil",
              "Alt panel versiyasını real telefonlarda daha tez sınayar və rəqəm kontrastını ilk iterasiyada düzəldərdim.",
            ],
          ],
        },
      ],
    },

    "cashmate-app": {
      title: "Cashmate — xərc izləmə tətbiqi",
      category: "Mobil tətbiq · Fintex",
      description: "Tədqiqatdan interaktiv prototipə qədər hazırlanmış xərc izləmə tətbiqi.",
      marquee: "Xərc izləmə · Mobil tətbiq dizaynı",
      summary: {
        facts: [
          ["Rolum", "Məhsul dizayneri — tədqiqat, UX və UI"],
          ["Komanda", "Fərdi layihə"],
          ["Platforma", "Mobil tətbiq (iOS)"],
          [
            "Əhatə",
            "İstifadəçi tədqiqatı, istifadəçi axını, wireframe-lər, dizayn sistemi, UI dizaynı və interaktiv prototip",
          ],
          [
            "Nəticə",
            "**Tam məhsul dizaynı** — müsahibələrdən klikləmək mümkün prototipə və komponent kitabxanasına qədər",
          ],
        ],
      },
      sections: [
        {
          label: "Haqqında",
          title: "Pulunuzun hara getdiyini görməyin sakit yolu",
          blocks: [
            [
              "Məhsul",
              "**Cashmate** insanlara şəxsi maliyyəsini idarə etməkdə kömək edən mobil tətbiqdir: xərc kateqoriyaları, xərc statistikası, maliyyə məqsədləri və daha çox.",
            ],
            [
              "Məqsəd",
              "Məqsəd əvvəlcə **hərtərəfli tədqiqat** aparmaq, sonra onun əsasında **müasir, istifadəçi dostu interfeys** yaratmaq idi.",
            ],
          ],
          imageAlt:
            "Əlində əskinaslar tutan illüstrasiyalı personajın yanında lime fonda Cashmate ana ekranı",
          caption: "Cashmate — xərc izləmə mobil tətbiqinin dizaynı.",
        },
        {
          label: "Dizayn prosesi",
          title: "Dörd mərhələ: suallardan sınaqdan keçmiş prototipə",
          blocks: [
            [
              "Tədqiqat",
              "Hədəf auditoriya, müsahibələr, tapşırıqlar (jobs) və istifadəçi hekayələri, rəqabət və funksional təhlil, moodboard.",
            ],
            ["Prototipləmə", "Funksional prototip, istifadəçi axını və wireframe-lər."],
            [
              "UI dizayn",
              "Vizual konsept, dizayn sistemi, komponent kitabxanası, animasiya və interaktiv prototip.",
            ],
            ["Test", "İstifadəçi testi və yekun düzəlişlər."],
          ],
          imageAlt:
            "Cashmate-in iki onboarding ekranının üstündə dörd mərhələ — tədqiqat, prototipləmə, UI dizayn və test",
          caption: "Dizayn prosesi.",
        },
        {
          label: "Auditoriya",
          title: "Pullarını izləyə bilməyən insanlar",
          blocks: [
            [
              "Kim",
              "Auditoriya genişdir: pulla məşğul olan demək olar ki, hər kəs, təxminən **15–65 yaş**. Onları birləşdirən odur ki, müxtəlif səbəblərdən **maliyyələrini izləyə bilmirlər**.",
            ],
            [
              "Aygun, 26",
              "Xərclərinin rəqəmsal uçotunu aparan və gəlirləri hər ayın sonunda qeyd edən müəllimə. **Ana ekranda kateqoriyalar üzrə qalıqlar**, qrafiklər və motivasiya edən məqsədlər istəyir.",
            ],
            [
              "Fuad, 30",
              "Gəlirini hər günün sonunda hesablayan bankir. **Bildirişlər** və **gündəlik limitlər** istəyir, bəzən xərcləri qeyd etməyi unudur və tətbiqləri başa düşməkdə çətinlik çəkir.",
            ],
            [
              "Açar sözlər",
              "Müsahibələrdə üç söz dönə-dönə təkrarlanırdı: **aydın, sadə, fərq etmək**.",
            ],
          ],
          imageAlt:
            "Müsahibələrdən iki istifadəçi profili: 26 yaşlı müəllimə Aygun və 30 yaşlı bankir Fuad",
          caption: "Müsahibə nəticələri — iki profil.",
        },
        {
          label: "Empatiya xəritəsi",
          title: "Nə deyirlər, nə düşünürlər, nə edirlər və nə hiss edirlər",
          blocks: [
            ["Deyir", "“Sadə və aydın olsun.” “Hesab qalığımı ana səhifədə görmək istərdim.”"],
            [
              "Düşünür",
              "Limit aşılanda bildiriş almaq və pulun əsasən hara getdiyini görmək faydalı olardı.",
            ],
            [
              "Edir",
              "İnterfeysi başa düşmədiyi üçün tətbiqi silib. Əslində lazım olmayan şeylərə çox xərcləyir.",
            ],
            [
              "Hiss edir",
              "“Pul hara getdi?” — başa düşmədiyi üçün məyusdur. Bəzən qeydlər aparmağa tənbəllik edir.",
            ],
            [
              "Nəticə",
              "Bundan üç ehtiyac ortaya çıxdı: **aydınlıq, qeyd etməyin sürətli yolu və limitlər və bildirişlər vasitəsilə yumşaq nəzarət**.",
            ],
          ],
          imageAlt:
            "“Büdcələr” və “Təhlil” ekranlarının üstündə dörd bölməli empatiya xəritəsi — deyir, düşünür, edir, hiss edir",
          caption: "Empatiya xəritəsi və onun apardığı yer: Büdcələr və Təhlil.",
        },
        {
          label: "İstifadəçi axını",
          title: "Bir tab panelinə sığan struktur",
          blocks: [
            [
              "Giriş",
              "Onboarding e-poçt və ya sosial şəbəkə vasitəsilə daxil olmağa və ya qeydiyyatdan keçməyə aparır; uğursuz qeydiyyat üçün xəta vəziyyəti də var.",
            ],
            [
              "Dörd bölmə",
              "**Ana səhifə** (hesablar, məqsədlər, qeydlər), **Kateqoriyalar**, **Büdcələr** və **Təhlil** (xərc və gəlir icmalı, xərc və gəlir axını, hesab təhlili).",
            ],
            [
              "Qərar",
              "Gündəlik lazım olan hər şey bir toxunuş məsafəsindədir, qeyd əlavə etmək isə həmişə mərkəzdəki **“+”** düyməsindən əlçatandır.",
            ],
          ],
          imageAlt:
            "Onboarding-dən giriş və qeydiyyat vasitəsilə Ana səhifə, Kateqoriyalar, Büdcələr və Təhlil bölmələrinə qədər istifadəçi axını diaqramı",
          caption: "İstifadəçi axını.",
        },
        {
          label: "Wireframe-lər",
          title: "Strukturu müəyyənləşdirmək üçün aşağı detallı ekranlar",
          blocks: [
            [
              "Sürətli daxiletmə",
              "Qeyd əlavə etmək kalkulyator tipli düymələrlə həyata keçirilir, onun üstündə hesab, kateqoriya, tarix və qeydlər yerləşir — rəqəmlər insanların artıq yığmağa vərdiş etdiyi şəkildə daxil edilir.",
            ],
            [
              "Təhlil",
              "Xərc icmalı, gəlir icmalı, xərc axını, gəlir axını və hesab təhlili arasında keçid olan vahid təhlil ekranı.",
            ],
            [
              "Büdcələr",
              "Proqres barları olan büdcəli kateqoriyalar və hələ büdcəsi olmayan kateqoriyaların ayrıca siyahısı.",
            ],
            [
              "Əsasın ətrafında",
              "Görünüş, təhlükəsizlik və bildirişlər üçün parametrlər və maliyyə təhsili üçün məqalə ekranı.",
            ],
          ],
          imageAlt:
            "Wireframe-lər: ana səhifə, qeyd əlavə etmə düymələri, məqalə, parametrlər, təhlil qrafikləri, büdcələr və kateqoriyalar",
          caption: "Wireframe-lər — hər ekranın strukturu.",
        },
        {
          label: "Dizayn sistemi",
          title: "Mərkəzində lime rəngi olan kiçik, çevik sistem",
          blocks: [
            [
              "Rəng",
              "Demək olar ki, qara əsas, əsas əməliyyatlar üçün **lime**, vurğular üçün isə **lilac, mint və çəhrayı** rənglər.",
            ],
            [
              "Tipoqrafiya",
              "32 pt qalın başlıqlardan 10 pt overline-lara qədər yeddi pilləli şrift şkalası.",
            ],
            [
              "Komponentlər",
              "Defolt, basılmış və qeyri-aktiv vəziyyətli düymələr, sosial şəbəkə ilə giriş düymələri, çiplər, mərkəzi əməliyyatlı tab paneli və aktiv və qeyri-aktiv vəziyyətlərdə ikon dəsti.",
            ],
          ],
          imageAlt: "Dizayn sistemi vərəqi: rənglər, tipoqrafiya, ikonlar, düymələr, çiplər və tab paneli",
          caption: "Dizayn sistemi vərəqi.",
        },
        {
          label: "Vizual konsept",
          title: "Mehriban, cəsarətli və bir az oynaq",
          blocks: [
            [
              "Konsept",
              "Lime, lilac, mint və çəhrayı rənglərlə demək olar ki, qara əsas. **Əllə çəkilmiş xətti illüstrasiyalar** ciddi mövzunu mehriban göstərir.",
            ],
            [
              "Onboarding",
              "Üç rəngarəng addım sakit, tünd giriş ekranına aparır — tətbiq girişdə oynaq, içəri girdikdən sonra isə yığcamdır.",
            ],
          ],
          imageAlt:
            "Üç ekran: lilac salamlama ekranı, lime “Ready to take control of your finances?” ekranı və tünd giriş ekranı",
          caption: "Onboarding və giriş.",
        },
        {
          label: "Sürətli daxiletmə",
          title: "Əsas dövr: xərci saniyələr ərzində əlavə etmək",
          blocks: [
            [
              "Niyə vacibdir",
              "Fuad xərcləri qeyd etməyi unudur, Aygun isə yalnız ayda bir dəfə qeyd edir. **Qeyd etmək yavaşdırsa, bu, ümumiyyətlə baş vermir.**",
            ],
            [
              "Necə",
              "Düymələr aşağıda, baş barmağın çatdığı yerdədir, **Saxla** düyməsi isə **Ləğv et**-in yanındadır.",
            ],
          ],
          imageAlt:
            "Xərc əlavə etmə ekranı: hesab, kateqoriya və alt kateqoriya seçimi, tarix, qeydlər, 100 məbləği və düymələr",
          caption: "Xərc əlavə et.",
        },
        {
          label: "Ekranlar",
          title: "Ana səhifə, “Kəşf”, kateqoriyalar və parametrlər",
          blocks: [
            [
              "Ana səhifə",
              "İllüstrasiyalı böyüdücü şüşəsi olan lime balans kartı, indiyədək olan xərc və gəlir və dərhal altında hesablar.",
            ],
            [
              "Kəşf",
              "İnvestisiya, kripto və NFT haqqında kiçik təhsil lenti — tətbiq həm izləyir, həm də öyrədir.",
            ],
            [
              "Kateqoriyalar və parametrlər",
              "Alt kateqoriyaları olan gəlir və xərc kateqoriyaları, həmçinin valyuta, başlanğıc səhifə, giriş kodu və xatırlatmalar üçün parametrlər.",
            ],
          ],
          gallery: [
            {
              alt: "Xərc əlavə etmə ekranı ümumi balans 650 və hesabların göstərildiyi ana ekranın yanında",
              caption: "Xərc əlavə et və balansa bax",
            },
            {
              alt: "Lentdə rəngarəng məqalə kartları olan “Kəşf” ekranı",
              caption: "Kəşf — yeni ideyalar sizi gözləyir",
            },
            {
              alt: "Parametrlər, NFT haqqında məqalə və gəlir kateqoriyaları siyahısı",
              caption: "Parametrlər, məqalə və kateqoriyalar",
            },
          ],
        },
        {
          label: "Yekun ekranlar",
          title: "Bütün dəst birlikdə",
          blocks: [
            [
              "Nəticə",
              "Tam ekran dəsti — onboarding, giriş, ana səhifə, kateqoriyalar, sürətli daxiletmə, büdcələr, təhlil, kəşf və parametrlər — hamısı vahid sistemdən qurulub.",
            ],
          ],
          imageAlt: "Lime fonda yekun Cashmate ekranlarının icmalı",
          caption: "Yekun ekranlar.",
        },
        {
          label: "Yekun düşüncələr",
          title: "Nə təqdim etdim və sırada nə var",
          blocks: [
            [
              "Təqdim olunan",
              "Müsahibələr və empatiya xəritəsi ilə tədqiqat, istifadəçi axını, wireframe-lər, komponent kitabxanası olan dizayn sistemi, yekun UI və interaktiv prototip.",
            ],
            [
              "Öyrəndiyim",
              "Sadəlik qalib gəlir. Danışdığım hər iki nəfər eyni şeyi müxtəlif sözlərlə istəyirdi: **qeyd etmək üçün daha az səy, pulun hara getdiyi barədə daha çox aydınlıq.**",
            ],
            [
              "Növbəti",
              "Prototipi daha çox insanla sınamaq, Fuad-ın istədiyi bildiriş və limit məntiqini işləyib hazırlamaq və parametrlər ekranının artıq işarə etdiyi açıq temanı sınamaq.",
            ],
          ],
        },
      ],
    },
  },
};

export default az;
