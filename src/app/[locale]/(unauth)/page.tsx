'use client';

/* eslint-disable */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import Slider from "react-slick";

// export async function generateMetadata(props: { params: { locale: string } }) {
//   const t = await getTranslations({
//     locale: props.params.locale,
//     namespace: 'Index',
//   });

//   return {
//     title: t('meta_title'),
//     description: t('meta_description'),
//   };
// }

export default function Index() {
 type Highlight = {
   name: string;
   message: string;
   weight: number;
   image_url: string[];
   post_url: string;
 };

 type Topic = {
   topic_id: number;
   title: string;
   topic_type: number;
   created_time: string;
   author: {
     id: number;
     name: string;
     avatar: {
       original: string;
       large: string;
       medium: string;
       small: string;
     };
     slug: string;
   };
   thumbnail_url: string;
   views_count: number;
   comments_count: number;
   votes_count: number;
   tags: {
     name: string;
     slug: string;
   }[];
 };

 const [highlight, setHighlight] = useState<Highlight[]>([]);
 const [topic, setTopic] = useState<Topic[]>([]);


  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  useEffect(() => {
    fethData();
    fetchDataTopic();
  }, []);

  const fethData = async () => {
    try {
      const res = await fetch(
        "https://pantip.com/api/forum-service/home/get_highlight",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,th;q=0.8",
            "if-none-match": 'W/"c65-aTzRjeOOWriUpfGrfzEm21qC3IU"',
            priority: "u=1, i",
            ptauthorize: "Basic dGVzdGVyOnRlc3Rlcg==",
            "sec-ch-ua":
              '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            cookie:
              "pantip_visitc=s4975t1hzqqZrnNZup9Aq; ka_iid=QwNHxwZKrHPzoJVx2uCCqg; _cc_id=f477ff062f791620e90246f359bab687; cto_bundle=gyjZSF9TVFlZJTJGaks3amQzRFBEZWY2VGxKU3h2cWhucElFbVMlMkY5TThTMDhVS05jJTJCemtyWDhZREhaa25ueFNURyUyQnZLWHFMR2lKYmdmZzBJbkFlWFoxc1VWRnAxZnNxSFZPSVk3VzFHTDdtVE9Pd2FTdjNBJTJCRVFTOHp6OUFGcjV2Q0p4NXloR1hka3MlMkZON3NNS2UlMkZnRDJUOUJ5USUzRCUzRA; ptpolicy=1; FCNEC=%5B%5B%22AKsRol9WegOKcpy45B_MRV0Whz7sjslqZ8C7U4bf0bU5os4TnsXjnGLrqdu6dr6gZ0rKlJo5PHF16PUEvp0uHhz9m6v4DGzBviS1YzZdGIFkWQYZ577Kfuu0xSI824gSXpFs_hIntv8A030QsxgwM5jm71DYxBUIYA%3D%3D%22%5D%5D; _gid=GA1.2.1978594900.1714410418; freq.5f73e63e47e7040e00000000=1; iUUID=8921d2ec659f0a2b22abc5de7f236aec; innity.dmp.cks.innity=1; __gads=ID=b34983ddf278af38:T=1714481571:RT=1714481571:S=ALNI_MZKix1JYdCfDADyzvH3q2kCRkIfGA; __gpi=UID=00000e011a67e805:T=1714481571:RT=1714481571:S=ALNI_MYZ6ox9BBM30AIHVYCaVc1r67Gxfg; __eoi=ID=02d5e0aad0d4b531:T=1714481571:RT=1714481571:S=AA-AfjYEynYBr2kaquDz3Qukrv8D; ka_sid=2KuSBjZdUpeBACd4gD75Th; _ga=GA1.1.680276026.1700200581; _ga_ZMC2WGXL4Z=GS1.1.1714560883.14.1.1714561034.60.0.0",
            Referer: "https://pantip.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: null,
          method: "GET",
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.message);
      }
      setHighlight(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataTopic = async () => {
    try {
      const res = await fetch(
        "https://pantip.com/api/forum-service/forum/room_topic_recommend?room=food&limit=10",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,th;q=0.8",
            "if-none-match": 'W/"2956-H16cxS0NVgRkf86v3GIwj7Itck4"',
            priority: "u=1, i",
            ptauthorize: "Basic dGVzdGVyOnRlc3Rlcg==",
            "sec-ch-ua":
              '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            cookie:
              "ka_iid=QwNHxwZKrHPzoJVx2uCCqg; _cc_id=f477ff062f791620e90246f359bab687; cto_bundle=gyjZSF9TVFlZJTJGaks3amQzRFBEZWY2VGxKU3h2cWhucElFbVMlMkY5TThTMDhVS05jJTJCemtyWDhZREhaa25ueFNURyUyQnZLWHFMR2lKYmdmZzBJbkFlWFoxc1VWRnAxZnNxSFZPSVk3VzFHTDdtVE9Pd2FTdjNBJTJCRVFTOHp6OUFGcjV2Q0p4NXloR1hka3MlMkZON3NNS2UlMkZnRDJUOUJ5USUzRCUzRA; ptpolicy=1; FCNEC=%5B%5B%22AKsRol9WegOKcpy45B_MRV0Whz7sjslqZ8C7U4bf0bU5os4TnsXjnGLrqdu6dr6gZ0rKlJo5PHF16PUEvp0uHhz9m6v4DGzBviS1YzZdGIFkWQYZ577Kfuu0xSI824gSXpFs_hIntv8A030QsxgwM5jm71DYxBUIYA%3D%3D%22%5D%5D; _gid=GA1.2.1978594900.1714410418; iUUID=8921d2ec659f0a2b22abc5de7f236aec; __gads=ID=b34983ddf278af38:T=1714481571:RT=1714481571:S=ALNI_MZKix1JYdCfDADyzvH3q2kCRkIfGA; __gpi=UID=00000e011a67e805:T=1714481571:RT=1714481571:S=ALNI_MYZ6ox9BBM30AIHVYCaVc1r67Gxfg; __eoi=ID=02d5e0aad0d4b531:T=1714481571:RT=1714481571:S=AA-AfjYEynYBr2kaquDz3Qukrv8D; pantip_visitc=sct0yg13h3XosC3aDE; _dc_gtm_UA-10478864-2=1; _ga=GA1.1.680276026.1700200581; ka_sid=WzUec13WuQh4bRD4Jg1rKY; _ga_ZMC2WGXL4Z=GS1.1.1714577160.16.1.1714577184.36.0.0",
            Referer: "https://pantip.com/forum/food",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: null,
          method: "GET",
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.message);
      }
      setTopic(data.data);
      console.log("topic");
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto max-w-[1700px]">
      <section id="highlight " className="border-b border-gray-200">
        <div className="container mx-auto">
          <div className="title">
            <h2 className="py-3 text-gray-900">Highlight</h2>
          </div>
          <div className="slider mx-auto">
            <Slider {...settings}>
              {highlight &&
                highlight.map((item, index) => {
                  return (
                    <div className="px-2" key={index}>
                      <div className="p-2 ">
                        <div className="flex cursor-pointer flex-col items-center justify-center transition-all duration-300 hover:scale-110">
                          <img
                            className="rounded-xl"
                            src={item.image_url[0]}
                            alt={item.name}
                          />
                          <p className="line-clamp-4 text-sm text-gray-900 md:line-clamp-3 lg:line-clamp-2">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </section>

      <section id="topic " className="border-b border-gray-200">
        <div className="container mx-auto ">
          <div className="title">
            <h2 className="py-3 text-gray-900">Food Topics</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 p-10 sm:grid-cols-2 md:px-20 lg:grid-cols-5">
            {topic &&
              topic.map((item) => {
                return (
                  <div
                    key={item.topic_id}
                    className="overflow-hidden rounded-xl bg-white text-gray-800 shadow-md transition duration-300 ease-in-out hover:scale-105"
                  >
                    <div className="relative">
                      <img
                        className="h-48 w-full object-cover"
                        src={item.thumbnail_url}
                      />
                      <div className="absolute right-0 top-0 m-2 flex items-center  justify-center gap-2 rounded-md bg-slate-700/60 p-1 text-sm text-white">
                        <IoEye />
                        {item.views_count}
                      </div>
                      <div className="absolute bottom-0 right-0 m-2 rounded-md bg-gray-800 px-2 py-1 text-xs text-white">
                        3 min read
                      </div>
                    </div>
                    <div className="flex flex-col justify-around p-4  ">
                      <div className="mb-2 text-lg font-medium text-gray-800">
                        {item.title}
                      </div>
                      <div className="avatar flex  items-center justify-start gap-3">
                        <img
                          className="size-8 rounded-full"
                          src={item.author.avatar.medium}
                        />
                        <span> {item.author.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="readmore flex w-full items-center justify-center">
          <button className="mb-4 rounded-full border border-gray-500 px-4  py-2 text-gray-800 transition duration-300 ease-in-out hover:scale-110">
            Read More
          </button>
        </div>
      </section>
    </div>
  );
}
