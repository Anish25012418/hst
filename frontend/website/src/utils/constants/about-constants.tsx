import {
  AboutSectionOneSchema,
  AboutSectionTwoSchema,
  AboutSectionThreeSchema,
  SocialResponsibiltySchema,
  TeamDescpSchema,
  TeamSchema,
} from "../schemas/AboutpageSchema";
///////////////////////////////////////
// WHY US
///////////////////////////////////////

// Section with title, description and image
export const aboutSectionOne: AboutSectionOneSchema = {
  header1:
    "Explore the Epic Trails and Incredible Culture of the Himalaya's with Local Professionals",
  para: "Himalayan single track was born through a shared passion for mountain biking and its development and promotion in nepal, the desire to explore the best trails and showcase them to cyclists from all over the world. \n the company is a nepalie/australian partnership which is 100% based and operated in nepal.It’s the perfect match where you get the exhilarating chaos of nepal bundled up into a well managed, well planned and safe package that will showcase the very best of what this country has to offer in terms of biking, culture and scenery.",
  leftImage:
    "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner2.jpg",
  rightImageOne:
    "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner3.jpg",
  rightImageTwo:
    "https://app.himalayansingletrack.com/web_images/banner/HomepageBanner6.jpg",
};

// Section with Title and Paragraph
export const aboutSectionTwo: AboutSectionTwoSchema[] = [
  {
    header2: "The Himalayan Single Track Difference",
    paragraph: [
      "The fact that we are a mountain bike company, with our own workshop, equipment and bikes. We are not a trekking or tour company selling mountain biking trips as an add on, or just because it is growing in popularity. We are selling mountain biking trips because that is what we do 100% of the time. We research and plan our own routes, we add on special trails and single tracks and we go the extra mile to make sure your trips are better.",

      "Of course other companies offer Annapurna, Upper Mustang etc, but we move with the moment, we do not stick to normal paths and we are happy to change our program on the fly according to your riding abilities, after all it’s your hard earned money and it’s your holiday so we want to make it the best. ",
    ],
  },
  {
    header2:
      "Why do we Choose to Price Individually & Not Have Our Prices Online?",
    paragraph:
      "Because we want to talk to you first! We want to know your group size, riding style and fitness level so we can modify our trips to make sure you have the best mountain biking holiday possible.",
  },
  {
    header2: "Why Do We Choose to not Have Our Itineraries Online?",
    paragraph: [
      "Frankly because NON-Mountain Bike Specific companies in Nepal copy and paste them. While we don’t own rights to the actual trails, we do spend ours and our guides time and efforts crafting out well written and researched itineraries for our clients. It’s a little of an inconvenience but just send us an email and we will send you full trip details in PDF form, our email response time is almost as fast as our riding!",
      "I think we have blown our own trumpet enough, so come and discover for yourself, if you are not happy at the end of the trip talk to us about a refund.",
    ],
  },
];

// Section with Title and List
export const aboutSectionThree: AboutSectionThreeSchema[] = [
  {
    header2: "What separates us from the crowd?",
    list: [
      "We have our own fleet of Mountain Bikes (Full Suspension and Hardtail).",
      "Our ride partners are Giant which allows us to update our fleet every 18 months.",
      " We run the ONLY mountain specific guide training program in Nepal with an MBLA (Mountain Bike Leaders Award) certificate which is recognized by British Cycling and tailored made to conditions in the Himalaya as well as work in conjunction with  MIAS and PMBIA",
      "Our guides, we love them, they are the backbone of our company and they have the right gear, training and experience to get the job done! – We listen to you. We want your holiday to be special, so we are open to new ideas, on the spot itinerary changes and customized biking programs.",
      "We specialize in local experience, be it from knowing where to get the best local food in town, to know hidden trails, scenic spots and those little experience that make holidays in Nepal so special.",
      "Don’t just take our word for it, check out what other’s have to say on TripAdvisor",
    ],
  },
  {
    header2: "Is Himalayan Single Track the Cheapest Option?",
    paragraph:
      "No we are not the cheapest operator in Nepal and there are reasons for that. We also understand many travelers have budget constraints and we are happy to modify programs to meet those needs but we cannot compromise in the below listed areas which means we might not be able to offer you the cheapest price in Nepal.",
    list: [
      "Our bikes. Just because we are in Nepal, does not mean we get cheaper bikes, in fact, bikes here are purchased at roughly the same price as they are in other countries and it’s even harder and more expensive to access quality equipment, spare parts and other items to maintain our bikes. Check yourself for our hire prices, we are offering the same standard gear as Europe or America at about half the price.",
      "Our workshop. It takes a lot of time, effort and money to maintain bikes and to do that we need a world-class workshop. The first thing many of our clients comment on is the high standard of our work shop.",
      "Our guides and the training we give them. MBLA, Wilderness First Aid, TAAN, Survival Skills, Rescue and we even train our guides how to brew organic coffee on the trail!",
      "Our Salary Structure. We commit to our guides year round, not just using them as demand requires. We pay salary year round, plus above average award rate for guiding days. This allows all our guides to follow our company standard and meet our training requirements which means a better, safer and more enjoyable experience for you.",
    ],
  },
];

///////////////////////////////////////
// Our Team
///////////////////////////////////////

export const teamDescp: TeamDescpSchema = {
  title: "Meet The Team",
  descp:
    "Himalayan Single Track (HST) is a partnership between Santosh and Jenny which was born through a shared passion for mountain biking and it’s development and promotion in Nepal, along with the desire to explore the best tracks and trails with cyclists from around the world. We also made it our company’s policy to support local riders. The Business quickly expanded from three bikes in a small shed in 2011 to 11 staff, 50 Hire bikes, a workshop, Giant Bike Shop and Tours office today. Over the years we have expanded the tours and trails we offer and our team are always on the endless search for new and exciting Single Track! At Himalayan Single Track we are always looking for ways to grow and improve our business in responsible tourism, quality, safety and environmental ethics. We are also the first and only company to date in Nepal to introduce MBLA (Mountain Bike Leaders Award) guide training and use guides certified to standards approved by the British Cycling Association’s guiding scheme and to implement risk assessment plans making your adventure with Himalayan Single Track rewarding and safe. While they are the founders of Himalayan Single Track, Santosh and Jenny truly believe that our team and guide’s are the true nuts and bolts of the company!",
};

export const teamFounders: TeamSchema[] = [
  {
    image: "https://guamhomesforsaleandrent.com/sites/default/files/team10.jpg",
    name: "Jenny",
    designation: "Co-founder/ Operation Manager",
  },
  {
    image: "https://guamhomesforsaleandrent.com/sites/default/files/team5.jpg",
    name: "Santosh Rai",
    designation: "Co-founder, Tour Leader, Mechanic",
  },
];

export const teamMembers: TeamSchema[] = [
  {
    image: "https://app.himalayansingletrack.com/web_images/teams/team1.jpg",
    name: "Yashu Sthapit",
    designation: "Jr. Developer",
  },
  {
    image: "https://guamhomesforsaleandrent.com/sites/default/files/team10.jpg",
    name: "Udip Yakha Rai",
    designation: "Sr. Developer",
  },
  {
    image: "https://guamhomesforsaleandrent.com/sites/default/files/team10.jpg",
    name: "Bikesh Maharjan",
    designation: "Sr. Network Engineer",
  },
  {
    image: "https://guamhomesforsaleandrent.com/sites/default/files/team10.jpg",
    name: "Subodh Chhetri",
    designation: "Sr. Network Engineer",
  },
  {
    image: "https://guamhomesforsaleandrent.com/sites/default/files/team10.jpg",
    name: "Devraj KC",
    designation: "Sr. Network Engineer",
  },
  {
    image: "https://guamhomesforsaleandrent.com/sites/default/files/team10.jpg",
    name: "Santosh Thapa",
    designation: "Sr. Network Engineer",
  },
  {
    image: "https://guamhomesforsaleandrent.com/sites/default/files/team10.jpg",
    name: "Pradip Shrestha",
    designation: "Sr. Network Engineer",
  },
];

///////////////////////////////////////
// Social Responsibility
///////////////////////////////////////
export const SocialResponsibility: SocialResponsibiltySchema[] = [
  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2022/10/pedal-against-hunger.jpg",
    header: "2020 Covid Relief",
    description: [
      {
        subHeader: "TATO KHANA SEWA",
        desp: "When the world went into lockdown in March 2020 we had no choice but to shut down our tours office. With nothing to do, we took to the streets with our guides and staff and set up a hot food kitchen to cater and distribute 300 meals a day to homeless people, stranded tourists, day workers and people affect by finical loss from the Covid Lock down. Our team proudly ran this kitchen from May until October. We used our bikes to deliver food including hot meals and dry food packages to the needy. Our workshop was transformed into a food store and our carpark a temporary kitchen.",
      },
      {
        desp: "Pedal against Hunger was a fundraising drive set up by our team to raise money for our Tato Khana Project. The idea was to set up stationary bikes, as due to the ongoing lockdown and rising covid cases we could no go outside. We aimed to ride 2000km in 24 hours, and raised funds along with our friends and fellow riders all over the world. The ride went live online and we were joined by riders from all over the world and managed to raise $10,000 to add to our cause. Our work with Tato Khana and Pedal against Hunger helped keep our team united and busy during these trying times.",
      },
    ],
  },

  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2022/10/pedal-against-hunger.jpg",
    header: "2017 Supporting Women In Mountain Biking",
    description: [
      {
        desp: "“Our very first production film, Moksha came about through a collaboration between ASDT, Ladies Mountain League(Nepal), Himalayan Single Track(Nepal), and WRKSHRT media(Jackson, Wy). The key women who made this film a reality also include: 10 x Xterra World Champion Shonny VanLandingham, International Guide and MTB Director Julie Cornelius, and Media House Director Francesca Weikert.”",
      },
      {
        desp: "Empowering Women in Mountain Biking 2017 has brought some new challenges to HST and some new faces into our team. We have chosen a path that leads to integrating more women into our workforce (Before we had none). The start of the year saw us launch into a British Cycling Supported Mountain Bike Leadership Training Program which allowed us to train the first professional mountain bike guides in Nepal, including 2 women – Usha and Roja. This is the first step into launching our very own line up of Mountain Bike Tours designed for  Women and Like Minded Men. Guided by well trained and skilled women Having used discount toner cartridges for twenty years, there have been a loot of changes in the toner cartridge market.",
      },
      {
        desp: "We extended this project in July in conjunction with  Ladies Mountain League when we open our Women’s Mountain Bike Library, a place where women can borrow bikes, learn to ride in safety and with the support of other women mountain bikers. This will be the first of its kind in Nepal. We hope this project will be the first step in developing more female riders in Nepal, more participants in races and more Mountain Bike Professional’s in the Industry. A percentage of trip profits goes back into the Mountain Bike Library. The simple fact of Employing women in this male dominated society is not easy. But we are proud of our efforts and our entire team.",
      },
    ],
  },

  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2022/10/pedal-against-hunger.jpg",
    header: "NCRR (NEPAL CYCLISTS RIDE TO RESCUE)",
    description: [
      {
        desp: "During the catastrophic earthquake that hit nepal in April 2015, Himalayan Single Track speared headed a team of Nepal’s best cyclists into action to take shelters, food, medical needs and water to stricken areas. This movement formed the NGO NCRR, which is still active till present. During this hectic time our team raised over US$80,000 to distribute much needed aid to remote areas of Nepal.",
      },
    ],
  },

  {
    image:
      "https://himalayansingletrack.com/wp-content/uploads/2022/10/pedal-against-hunger.jpg",
    header: "SEVEN SCHOOLS IN SEVEN WEEKS",
    description: [
      {
        desp: "This ambition project was created when we found that all of the schools in the Siknra Besi district had been destroyed. We at first replaced the schools with temporary shelters and then became part of the team and the ambitions project to raise funds and rebuild all seven schools.",
      },
    ],
  },
];
