import React from "react";
import {
   ShoppingBag,
   CloudDownload,
   Zap,
   Ticket,
   Repeat,
   Briefcase,
   PlayCircle,
   Video,
   Users,
   DollarSign,
} from "lucide-react";
import { Link } from "@remix-run/react";


const productFeatures = [
   {
      title: "Physical Product",
      description:
         "Sell any kind of physical product, from clothing to books to electronics and appliances and more.",
      icon: ShoppingBag,
      slug: "physical-product",
   },
   {
      title: "Digital Product",
      description:
         "Sell any kind of digital product, from ebooks, to any downloadable product, to music to courses (downloadable or hosted outside Selar) to any other product you host on external platforms and more.",
      icon: CloudDownload,
      slug: "digital-product",
   },
   {
      title: "With Improved Features",
      description: "Enhanced features and tools to improve product management and user experience.",
      icon: Zap,
      slug: "with-improved-features",
   },
   {
      title: "Ticket",
      description: "Sell tickets to events, workshops, trainings, webinars, and more.",
      icon: Ticket,
      slug: "ticket",
   },
   {
      title: "Subscription",
      description:
         "Sell recurring payment subscriptions for your product or service to your customers.",
      icon: Repeat,
      slug: "subscription",
   },
   {
      title: "Service",
      description:
         "Sell any kind of service, from coaching services to consultations to counseling sessions to design services, etc.",
      icon: Briefcase,
      slug: "service",
   },
   {
      title: "Course (Hosted on Selar)",
      description:
         "Sell courses (with multiple videos or audio) that your users can watch directly on Selar after paying. You get to upload the files directly to Selar, and there's an option to make the video/audio files non-downloadable.",
      icon: PlayCircle,
      slug: "course-hosted-on-selar",
   },
   {
      title: "Stream Online Only Video/Audio",
      description:
         "Sell a single video or audio that users get to watch directly on Selar (without downloading). Great for replays, single webinar videos, etc.",
      icon: Video,
      slug: "stream-online-only-video-audio",
   },
   {
      title: "Membership Course (Hosted on Selar) [BETA]",
      description:
         "Sell a subscription where you upload files to a member area for your subscribers to access. On subscription cancellation, they lose access to the files.",
      icon: Users,
      slug: "membership-course-hosted-on-selar-beta",
   },
   {
      title: "Flexible Subscription",
      description:
         "Sell very flexible payment plans for your high-ticket products. This option allows customers to enter the amount of their first installment while splitting the balance in subsequent installments.",
      icon: DollarSign,
      slug: "flexible-subscription",
   },
];

const ProductTypeSelect = () => {
   return (
      <div className="product__select">
         <h1 className="product__select__text">Select a product type to proceed</h1>{" "}
         <div className="product__select__grid">
            {productFeatures.map((feature, index) => {
               const Icon = feature.icon;
               return (
                  <div
                     className="grid-card"
                     key={index}
                  >
                     <Icon />
                     <div>
                        <h1>{feature.title}</h1>
                        <p className="line-clamp-3">{feature.description}</p>
                        <Link to={`/me/products/create?type=${feature.slug}`}>Select</Link>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default ProductTypeSelect;
