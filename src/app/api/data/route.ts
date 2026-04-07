import { NextResponse } from "next/server";

import { HeaderItem } from "@/app/types/menu";
import { aboutdata } from "@/app/types/aboutdata";
import { workdata } from "@/app/types/workdata";
import { featureddata } from "@/app/types/featureddata";
import { testimonials } from "@/app/types/testimonials";
import { footerlinks } from "@/app/types/footerlinks";

// header nav-links data
const headerData: HeaderItem[] = [
  { label: "About Us", href: "#About" },
  { label: "FAQ", href: "#FAQ" },
  { label: "Articles", href: "#Blog" },
];

// about data
const Aboutdata: aboutdata[] = [
  {
    heading: "About us.",
    imgSrc: "/images/aboutus/imgOne.svg",
    paragraph:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem",
    link: "Learn more",
  },
  {
    heading: "Services.",
    imgSrc: "/images/aboutus/imgTwo.svg",
    paragraph:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem",
    link: "Learn more",
  },
  {
    heading: "Our Works.",
    imgSrc: "/images/aboutus/imgThree.svg",
    paragraph:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem",
    link: "Learn more",
  },
];

// work-data
const WorkData: workdata[] = [
  {
    profession: "CEO & Co-founder",
    name: "Ekram Islam",
    imgSrc: "/images/wework/ekram.jpg",
    email: "ekram@lynksphere.com",
  },
  {
    profession: "CTO & Co-founder",
    name: "Zabir Raihan",
    imgSrc: "/images/wework/zabir.jpg",
    email: "zabir@lynksphere.com",
  },
  {
    profession: "Lead Graphics Designer",
    name: "MD Abidur Rashid",
    imgSrc: "/images/wework/abidur.jpg",
    email: "info@lynksphere.com",
  },
];

// featured data
const FeaturedData = [
  {
    heading: "AI Powered Chat & Image Generation",
    images: [
      "/images/products/lynkchat/lynkchat1.jpg",
      "/images/products/lynkchat/lynkchat2.jpg",
    ],
  },
  {
    heading: "News Aggregator for Professionals",
    images: [
      "/images/products/swiftrss/swiftrss1.jpg",
      "/images/products/swiftrss/swiftrss2.jpg",
    ],
  },
  {
    heading: "Stream Movies & TV Shows",
    images: [
      "/images/products/swiftjelly/swiftjelly1.jpg",
      "/images/products/swiftjelly/swiftjelly2.jpg",
    ],
  },
];

// plans data
const PlansData = [
  {
    heading: "Startup",
    price: {
      monthly: 19,
      yearly: 190,
    },
    user: "per user",
    features: {
      profiles: "5 Social Profiles",
      posts: "5 Scheduled Posts Per Profile",
      templates: "400+ Templated",
      view: "Calendar View",
      support: "24/7 Support",
    },
  },
  {
    heading: "Business",
    price: {
      monthly: 29,
      yearly: 290,
    },
    user: "per user",
    features: {
      profiles: "10 Social Profiles",
      posts: "5 Scheduled Posts Per Profile",
      templates: "600+ Templated",
      view: "Calendar View",
      support: "24/7 VIP Support",
    },
  },
  {
    heading: "Agency",
    price: {
      monthly: 59,
      yearly: 590,
    },
    user: "per user",
    features: {
      profiles: "100 Social Profiles",
      posts: "100 Scheduled Posts Per Profile",
      templates: "800+ Templated",
      view: "Calendar View",
      support: "24/7 VIP Support",
    },
  },
];

// testimonial data
const TestimonialsData: testimonials[] = [
  {
    name: "Robert Fox",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/images/testimonial/user1.svg",
    rating: 5,
  },
  {
    name: "Leslie Alexander",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/images/testimonial/user2.svg",
    rating: 4,
  },
  {
    name: "Cody Fisher",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/images/testimonial/user3.svg",
    rating: 4,
  },
  {
    name: "Robert Fox",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/images/testimonial/user1.svg",
    rating: 4,
  },
  {
    name: "Leslie Alexander",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/images/testimonial/user2.svg",
    rating: 4,
  },
  {
    name: "Cody Fisher",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
    imgSrc: "/images/testimonial/user3.svg",
    rating: 4,
  },
];

// footer links data
const FooterLinksData: footerlinks[] = [
  {
    section: "Menu",
    links: [
      { label: "About Us", href: "#About" },
      { label: "FAQ", href: "#FAQ" },
      { label: "Articles", href: "#Blog" },
    ],
  },
  {
    section: "Category",
    links: [
      { label: "Design", href: "/" },
      { label: "Mockup", href: "/" },
      { label: "View all", href: "/" },
      { label: "Log In", href: "/" },
    ],
  },
  {
    section: "Pages",
    links: [
      { label: "404", href: "/" },
      { label: "Instructions", href: "/" },
      { label: "License", href: "/" },
    ],
  },
  // {
  //   section: "Others",
  //   links: [
  //     { label: "Styleguide", href: "/" },
  //     { label: "Changelog", href: "/" },
  //   ],
  // },
];

export const GET = () => {
  return NextResponse.json({
    headerData,
    Aboutdata,
    WorkData,
    FeaturedData,
    PlansData,
    TestimonialsData,
    FooterLinksData,
  });
};
