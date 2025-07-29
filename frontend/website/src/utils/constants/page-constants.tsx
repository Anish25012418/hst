import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
///////////////////////////////
// Rental Page
///////////////////////////////

interface RentalDescpSchema {
  header: string;
  image: string;
  description: string[];
  subHeader: string;
  subDescription: string;
}

interface RentalCycleSchema {
  image: string;
  title: string;
  description: string;
  feature: string[];
}

export const rentalDescp: RentalDescpSchema = {
  header:
    "Are you looking to rent a bicycle for your cycling adventure in Kathmandu?",
  image:
    "https://www.atlasrideco.com/sites/default/files/styles/hero_header_narrow/public/2021-11/pila%20epic%20ridge.jpg?h=67271237&itok=O0zUXgYr",
  description: [
    "If you are looking to cruise through the alleys of Kathmandu valley, or to explore the single tracks around the valley, or even embarking on an adventure into the Himalaya’s, then look no further than Himalayan Single Track, we have got you covered with Giant’s largest fleet of rental mountain bikes.",
    "Bike pickup is available at our store in Thamel or Pokhara, we are located at the heart of the tourist district.",
    "Reservation is required- Give us a call or text if your are looking for same day rental. +977 9823100104. We also rent bike racks, and we can also arrange delivery to your location.",
    "We also offer guided day trips and proffesional mountain bike shuttle service.",
  ],
  subHeader: "About our Bikes",
  subDescription:
    "We have our own fleet of Mountain Bikes (Full Suspension and Hardtail). Our ride partners are Giant which allows us to update our fleet every 18 months. Our workshop. It takes a lot of time, effort and money to maintain bikes and to do that we need a world-class workshop. The first thing many of our clients comment on is the high standard of our work shop.",
};

export const rentalCycle: RentalCycleSchema[] = [
  {
    image: "https://app.himalayansingletrack.com/web_images/Giant.png",
    title: "FULL SUSPENSION - GIANT TRANCE X",
    description:
      "The Giant Trance X is the ideal bike for Nepal, weather its Enduro day trips in Kathmandu Valley or making your way into the mountains on the single track search, this bike is perfect.",
    feature: [
      "Fox 36 up Front and Rear Fox Float DPS",
      "Sram 1×12 NX Eagle Drivetrain",
      "Dropper Post",
    ],
  },
  {
    image: "https://app.himalayansingletrack.com/web_images/Hardtrail.png",
    title: "HARDTAIL - GIANT TALON 1",
    description:
      "A qaulity hardtail that can go anywhere and do anything. A very capable climbing machine and it also comes downhill like a charm! This is a great bike for bikepacking Annapurnas or zipping around Kathmandu City.",
    feature: [
      "100mm Air Suspension Fork",
      "1 x 10 Drive Train",
      "Hydrulic Disc Breaks",
    ],
  },
];

///////////////////////////////
// Workshop Page
///////////////////////////////

interface WorkshopDescpSchema {
  bannerImg: string;
  header: string;
  subHeader?: string;
  description?: string;
}

interface WorkshopListSchema {
  image: string;
  header: string;
  description: string;
}

export const workshopDescp: WorkshopDescpSchema = {
  bannerImg:
    "https://himalayansingletrack.com/wp-content/uploads/2023/05/Workshop-Banner.jpg",
  header: "Servicing That Makes Every Ride Better",
  subHeader: "",
  description: "",
};

export const workshopList: WorkshopListSchema[] = [
  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2023/05/Workshop-Banner.jpg",
    header: "FOX SERVICE CENTER",
    description:
      " Himalayan Single Track’s workshop is the only certified Fox Service Center in Nepal. Our Mechanics professionally service your Fox Forks, Shocks and Seat Posts with Original Parts, Seals, Bushings, Oils, Bath Fluids and Lubricants.",
  },
  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2023/05/Workshop-Banner.jpg",
    header: "BIKE SERVICING",
    description:
      "All of our bike servicing starts with a professional overall check of your bike, where our mechanics will guide you through what the problems are and how they can be fixed. We offer many levels of service from basic checkup and safety checks to a full bike overhaul.",
  },
  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2023/05/Workshop-Banner.jpg",
    header: "BIKE SETUP & TUNING",
    description:
      " Our Mechanics will help you set up your bike so that you can get the most efficient performance. Proper bike set up, including Suspension Sag, Seat height and angle, arm reach and cockpit setups are all key points to getting the best out of your ride.",
  },
  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2023/05/Workshop-Banner.jpg",
    header: "BIKE WASH",
    description:
      "  Our bike wash station is the key to keeping your bike smooth and clean so you can just focus on riding.",
  },
  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2023/05/Workshop-Banner.jpg",
    header: "PICK UP & DROP OFF",
    description:
      "  Don’t have time to visit us? Then we offer a home delivery service.",
  },
  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2023/05/Workshop-Banner.jpg",
    header: "MECHANIC TRAININGS",
    description:
      "If you want to learn more about your bike and maintaining it, the sign up for one of our training courses.",
  },
];

export const workshopBrand: any = [
  {
    brand: "https://app.himalayansingletrack.com/web_images/brand_shimano.png",
  },
  { brand: "https://app.himalayansingletrack.com/web_images/brand_fox.jpg" },
  {
    brand:
      "https://app.himalayansingletrack.com/web_images/brand_park_tool.png",
  },
];

///////////////////////////////
// HST Pokhara Page
///////////////////////////////

export const hstPokharaDescp: any = {
  header: "Welcome to HST Pokhara",
  description: [
    "Pokhara is a beautiful lakeside town nestled at the base of the Annapurna, Nilgiri and Dhaulagiri Himalayas. The pace of life in Pokhara is much more relaxed compared to Kathmandu. The warm weather, tranquil lake vibes and snow capped himalayan vistas make it the perfect place to spend a few days. Alot of treks and tours start and end in Pokhara. Mountain biking in Pokhara has always been a favorite for visitors and locals alike.",
    "We have bike rentals by the hour for cruising around the lake, full suspension bikes for smashing the trails as well as guided tours around the Pokhara Valley. Pokhara is also the gateway to the famous Lower Mustang region, home of the popular Lubra Valley trail. Pokhara is the perfect launching place for tours into this region and you can see what we offer below. Not just hardcore single tracks, but also easier culture experiences for intermediate riders.",
  ],
  trips: [
    {
      header: "Day Trips Around Pokhara",
      descp:
        "Himalayan Single Tracks Pokhara office, offers a range of mountain bike day trips for all range of riders from an easy pedal around the lake to some hardcore trail smashing Enduro rides.",
      href: "",
    },
    {
      header: "Overnight Trips Around Pokhara",
      descp:
        "Pokhara has a lot to offer when it comes to overnight trips. Around the picturesque valley are a series of quaint villages which boast authentic culture and stunning mountain views. Some of the places we can visit on Overnight trips includes Astam Village, Australian Camp, Begnas Lake",
      href: "",
    },
  ],
  contact: [
    {
      header: "Contact & Location Details",
      descp:
        "To customize your Pokhara overnight trip you can email us or contact our Pokhara office directly.",
      contact: [
        {
          icon: (
            <FaPhoneAlt className="text-brand-yellow-600 text-xl font-bold transition-all hover:scale-110" />
          ),
          text: "+977 984122568",
        },
        {
          icon: (
            <MdEmail className="text-brand-yellow-600 text-xl font-bold transition-all hover:scale-110" />
          ),
          text: "hstpokhara@gmail.com",
        },
        {
          icon: (
            <MdLocationPin className="text-brand-yellow-600 text-xl font-bold transition-all hover:scale-110" />
          ),
          text: "HST, Street 16 Middle Path, Lakeside Pokhara",
        },
      ],
    },
  ],
  gallery: [
    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",
    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",
    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",
    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",

    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",
    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",
    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",
    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",

    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",
    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",
    "https://himalayansingletrack.com/wp-content/uploads/2024/03/Pokharabanner-1290x737.jpg",
    "https://himalayansingletrack.com/wp-content/uploads/2023/05/Workshop-Banner.jpg",
  ],
};
