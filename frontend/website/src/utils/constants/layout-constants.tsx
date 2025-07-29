/**
 * @title : layout-constants
 * @description: used in layouts (header, footer and such)
 *
 **/

// Default
import { AiFillInstagram } from "react-icons/ai";
import * as FaIcons from "react-icons/fa6";
import * as FcIcons from "react-icons/fc";
// import { LiaUserSecretSolid } from "react-icons/lia";
import * as PiIcons from "react-icons/pi";
// import { PiPhoneCallFill } from "react-icons/pi"

// Utils
// import { NavItemSchema } from "@/utils/schemas/GlobalSchema";
import {
  BasicDescriptionSchema,
  BlogSchema,
  HomeDescriptionSchema,
  SocialLinksSchema,
  TestimonialSchema,
} from "@/utils/schemas/HomepageSchema";
import {FaYoutube} from "react-icons/fa";

// Banner image
export const bannerImage: any = [
  {
    // img: Img.Banner_jpg,
    img: "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner9.jpg",
    descp: "First Banner",
  },
  {
    img: "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner2.jpg",
    descp: "Second Banner",
  },
  {
    img: "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner3.jpg",
    descp: "Third Banner",
  },
  {
    img: "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner4.jpg",
    descp: "Fourth Banner",
  },
  // {
  //   img: "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner5.jpg",
  //   descp: "Fifth Banner",
  // },
  {
    img: "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner6.jpg",
    descp: "Fifth Banner",
  },
  {
    img: "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner7.jpg",
    descp: "Fifth Banner",
  },
  {
    img: "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner8.jpg",
    descp: "Fifth Banner",
  },
];

// Homepage description
export const homeDescription: HomeDescriptionSchema = {
  title:
    "Unleash the Epic Trails and Rich Culture of the Himalayas with Local Experts Himalayan Single Track",
  descp:
    "Himalayan Single Track was born from a shared passion for mountain biking and a commitment to its growth and promotion in Nepal. Our goal is to uncover the best trails and showcase them to cyclists from around the globe. As a unique Nepali-Australian partnership, we are 100% based and operated in Nepal. This fusion brings you the exhilarating chaos of Nepal wrapped in a well-managed, meticulously planned, and safe package that highlights the very best this country has to offer in biking, culture, and scenery. \n Discover why Himalayan Single Track is the premier mountain bike tour company in Nepal. With us, you'll experience unparalleled trails, authentic cultural encounters, and breathtaking landscapes, all guided by local professionals who know the Himalayas like no one else. Join us for an adventure that combines exhilaration, discovery, and the beauty of Nepal’s majestic terrain.",
};

// Homepage basic description
export const basicDescription: BasicDescriptionSchema[] = [
  {
    title: "Professional Guides",
    descp: "",
    icon: "https://app.himalayansingletrack.com/web_images/why_us/trekking.svg",
    bgColor: "bg-[#F8A408]",
    color: "text-black",
    // review: Img.Star_icon_svg,
  },
  {
    title: "Flexibility",
    descp: "",
    icon: "https://app.himalayansingletrack.com/web_images/why_us/compass.svg",
    bgColor: "bg-gray-300",
    // review: Img.Star_icon_svg,
    color: "text-black",
  },
  {
    title: "Local & Authentic",
    descp: "",
    icon: "https://app.himalayansingletrack.com/web_images/why_us/authentic.svg",
    bgColor: "bg-black",
    color: "text-[#F8A408]",
    // review: Img.Star_icon_svg,
  },
  {
    title: "Trail Experts",
    descp: "",
    icon: "https://app.himalayansingletrack.com/web_images/why_us/trial.svg",
    bgColor: "bg-[#696767]",
    // review: Img.Star_icon_svg,
    color: "text-white",
  },
];

// Navbar menu list in Header / Footer
export const navMenuList: any[] = [
  {
    href: "/home",
    label: "Home",
  },
  {
    // href: "/about",
    label: "About",
    child: [
      {
        href: "/about/why-us",
        label: "Why HST",
      },
      {
        href: "/about/social-responsibility",
        label: "Social Responsibility",
      },
      {
        href: "/about/our-team",
        label: "Meet Our Team",
      },
    ],
  },
  {
    href: "/contact",
    label: "Contact",
  },

  {
    href: "/rental",
    label: "Rental",
  },
  {
    href: "/workshop",
    label: "Workshop",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/hst-pokhara",
    label: "HST Pokhara",
  },
];

// Navbar menu list in Header / Footer
// export const megaMenuList: NavItemSchema[] = [
//   {
//     href: "/mtb-tours",
//     label: "Mtb Tours",
//     image:
//       "https://www.atlasrideco.com/sites/default/files/styles/hero_header_narrow/public/2021-11/pila%20epic%20ridge.jpg?h=67271237&itok=O0zUXgYr",
//     hoveredImage:
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/f8/0b/00/caption.jpg?w=500&h=400&s=1",
//     videoSrc: "https://app.himalayansingletrack.com/web_images/cycle.mp4",
//     child: [
//       {
//         href: "/enduro",
//         label: "Enduro",
//       },
//       {
//         href: "/cross-country",
//         label: "Cross Country",
//       },
//       {
//         href: "/heli-biking",
//         label: "Heli Biking",
//       },
//     ],
//   },

//   {
//     href: "/cycle-tour",
//     label: "Cycle Tour",
//     image:
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/f8/0b/00/caption.jpg?w=500&h=400&s=1",
//     hoveredImage:
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/f8/0b/00/caption.jpg?w=500&h=400&s=1",
//     videoSrc: "https://app.himalayansingletrack.com/web_images/cycle.mp4",
//   },

//   {
//     href: "/multi-adventure",
//     label: "Multi Adventure",
//     image:
//       "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/dc/8a.jpg",
//     hoveredImage:
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/f8/0b/00/caption.jpg?w=500&h=400&s=1",
//     videoSrc: "https://app.himalayansingletrack.com/web_images/cycle.mp4",
//   },

//   {
//     href: "/trekking",
//     label: "Trekking",
//     image:
//       "https://www.valthorens.com/app/uploads/iris-images/5858/adobestock-235185167-1-1920x1080-f50_50.webp",
//     hoveredImage:
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/f8/0b/00/caption.jpg?w=500&h=400&s=1",
//     videoSrc: "https://app.himalayansingletrack.com/web_images/cycle.mp4",
//   },

//   {
//     // href: "/day-overnight-trips",
//     label: "Day & Overnight Trips",
//     image:
//       "https://s3-cdn.designerjourneys.com/blog/wp-content/uploads/2018/06/25210313/Bhutan-Trekking.jpg",
//     hoveredImage:
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/f8/0b/00/caption.jpg?w=500&h=400&s=1",
//     videoSrc: "https://app.himalayansingletrack.com/web_images/cycle.mp4",
//     child: [
//       {
//         href: "/day-overnight-trips/kathmandu",
//         label: "Kathmandu",
//       },
//       {
//         href: "/day-overnight-trips/pokhara",
//         label: "Pokhara",
//       },
//       {
//         href: "/day-overnight-trips/overnight-trips",
//         label: "Overnight Trips",
//       },
//       {
//         href: "/day-overnight-trips/skills-session",
//         label: "Skill Sessions",
//       },
//     ],
//   },

//   {
//     href: "/bhutan",
//     label: "Bhutan",
//     image:
//       "https://www.manasluadventures.com/wp-content/uploads/2017/12/shutterstock_270259346.jpg",
//     hoveredImage:
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/f8/0b/00/caption.jpg?w=500&h=400&s=1",
//     videoSrc: "https://app.himalayansingletrack.com/web_images/cycle.mp4",
//   },
// ];

// Footer menu
export const footerList: any = [
  {
    companyInfo: {
      description:
        "Himalayan Single Track was born through a shared passion for mountain biking and its development and promotion in Nepal, the desire to explore the best trails and showcase them to cyclists from all over the world.",
    },
    contactInfo: {
      Kathmandu: {
        phone: "+977 9823100104",
        email: "himalayansingletrack@gmail.com",
        location: "Thamel- Annapurna Market, Kathmandu",
      },
      Pokhara: {
        phone: "+977 981-3873020/ 9802822902",
        email: "himalayansingletrack@gmail.com",
        location:
          "Himalayan Single Track, Street 16 Middle Path, Lakeside Pokhara",
      },
    },
  },
];

// Navbar of legal portion
export const legalMenuList: any[] =
  // {
  //   href: "/legal",
  //   label: "Legal",
  //   icon: <></>,
  //   child:
  [
    {
      href: "/terms-and-conditions",
      label: "Terms and Conditions",
      icon: <PiIcons.PiNotepadFill />,
    },
    {
      href: "/Privacy-policy",
      label: "Privacy Policy",
      icon: <FcIcons.FcPrivacy />,
    },
    {
      href: "/cookies-policy",
      label: "Cookies Policy",
      icon: <PiIcons.PiCookieDuotone />,
    },
  ];
// };

// Social links in the footer (currently)
export const socialLinks: SocialLinksSchema[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/singletracknepal",
    icon: <FaIcons.FaFacebook className="text-[19px]" />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/hstnepal",
    icon: <FaIcons.FaXTwitter className="text-[19px]" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/himalayansingletrack/",
    icon: <AiFillInstagram className="text-[22px]" />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@hstNepal",
    icon: <FaYoutube  className="text-[21px]" />,
  },
];

export const blog: BlogSchema[] = [
  {
    img: "https://himalayansingletrack.com/wp-content/uploads/2023/09/everest-1-370x263.jpg",
    title: "Reasons to go on the Everest Base Camp Yoga Trek 2024",
    descp: "",
  },
  {
    img: "https://himalayansingletrack.com/wp-content/uploads/2022/12/Tiji-Festival-Upper-Mustang-1290x683.jpg",
    title: "The Mystical Tiji Festival",
    descp: "",
  },

  {
    img: "https://himalayansingletrack.com/wp-content/uploads/2022/09/cropped-langtang-valley-slider-3-500x500-1.jpg",
    title: " Trekking and Dancing Through Langtang",
    descp: "",
  },
];
// Testimonial constants
export const testimonial: TestimonialSchema[] = [
  {
    img: "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/e4/ca/default-avatar-2020-51.jpg",
    name: "Alistair T",
    star: 5,
    header: "Brilliant guided ride",
    descp:
      "Superb. I took a guided ride up to the Shivapuri national park trails. Great trails, great workout, great views, and great fun thanks to my guide Om, who was brilliant and entertaining. A good mix of road and trail, a great experience, and a high quality bike in perfect condition. Couldn't ask for anything more. Best fun I've had on a mountain bike for a long time, and a very satisfying and rewarding ride.",
  },

  {
    img: "https://media-cdn.tripadvisor.com/media/photo-l/08/07/fa/0b/chris-c.jpg",
    name: "Chris C",
    star: 5,
    header: "Excellent thrills",
    descp:
      "Thoroughly recommend, I had a few days left in Nepal, wondered what to spend the time. Popped in, they recommend me a trip to Shivapuri Nagarjun National Park. So hired a decent bike at a very reasonably price and had a fantastic couple days. Day one was a hard graft up the mountain, day two was insane coming down. Loved it!!!!",
  },

  {
    img: "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/f1/79/default-avatar-2020-21.jpg",
    name: "Trail63091613222",
    star: 5,
    header: "An Epic Adventure Thanks to Himalayan Single Track!",
    descp:
      "I recently completed one of the most unique and epic experiences of my life thanks to Himalayan Single Track, the owner Jenny, and my amazing guide, Anil. I had the opportunity in November 2023 to trek to Everest Base Camp, across Cho La Pass, and to Gokyo with HST. This has to be one of the most incredible experiences I have ever had. Jenny who owns HST was extremely helpful, supportive, and caring. I feel like she went above and beyond her duties to make sure that myself and the two people I was with felt comfortable and welcome. We got to Kathmandu a few days before our trek began. Jenny personally came and picked us up from the airport and helped us with some of the last minute preparations like helping me rent a sleeping bag. She also took us to dinner in Kathmandu before and after the trek. She even invited me for coffee and spent an hour of her work day chatting with me after the other people in my group had left, which she certainly didn't have to do. Anytime we needed anything, she was there for us. Every time she would come to the hotel and personally make sure we had everything we needed. On the trek itself, our guide Anil, was amazing. He is probably the most kind, caring person, I have ever met. He was extremely knowledgeable, answering the plethora of questions I threw at him. He even recorded a podcast with episode with me! He made sure we were comfortable and doing ok everyday. He was patient, kind, and super helpful as we navigated our way to EBC and all of the teahouses and stops along the way. Anil made this trip so much easier for myself and I am very thankful for him. Even way adjustments to the itinerary had to be made, he was cool, calm, and collected. Whether you are mountain biking, trekking, or doing any other sort of tour with Himalayan Single Track you are in good hands. I can't recommend them enough for anyone looking for an epic adventure when visiting Nepal.",
  },
  {
    img: "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/e9/bb/default-avatar-2020-65.jpg",
    name: "Laurens K",
    star: 5,
    header: "Most epic trip ever",
    descp:
      "HST arranged the most epic trip ever for me and my brother. If you like the MTB and want to make memories for the rest of your live. There is only one organisation who can do that for you in Nepal.",
  },
  {
    img: "https://media-cdn.tripadvisor.com/media/photo-l/1c/0a/f0/6e/142brucep.jpg",
    name: "Bruce Payne",
    star: 5,
    header: "Annapurna by Mountain Bike Adventure",
    descp:
      "Annapurna by mountain bike. The best mountain bike Adventure Travel experience we have ever done. Thank you Jenny and HST for providing an excellent itinerary with great administration and logistics to support the trip. The bikes provided were fantastic.",
  },
];
