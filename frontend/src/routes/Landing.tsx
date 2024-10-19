import React, { useState } from "react";
import {
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import LandingNavBar from "../components/LandingNavBar";
import { useInView } from "react-intersection-observer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DaBomb from "../assets/business-logos/DaBomb.png";
import DirtFlowers from "../assets/business-logos/DirtFlowers.png";
import HomeDepot from "../assets/business-logos/HomeDepot.jpg";
import HEB from "../assets/business-logos/HEB.png";
import PointSkate from "../assets/business-logos/PointSkate.png";
import SpinsterRecords from "../assets/business-logos/SpinsterRecords.png";
import WhiteRockCoffee from "../assets/business-logos/WhiteRockCoffee.png";
import WhiteRockSoap from "../assets/business-logos/WhiteRockSoap.png";
import stockWomanPhoto from "../assets/stockWomanPhoto.jpg";
import stockOldManPhoto from "../assets/stockOldManPhoto.jpg";
import stockBoyPhoto from "../assets/stockBoyPhoto.jpg";

const Landing = () => {
  // InView hooks for educational section content changes
  const [ref, inView] = useInView({ threshold: 0.5 });

  // InView hooks for floating about section
  const [aboutRef1, aboutInView1] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [aboutRef2, aboutInView2] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [aboutRef3, aboutInView3] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleScroll = (e: any) => {
    const section = e.target;
    const scrollPos = section.scrollTop;
    const sectionHeight = section.scrollHeight - section.clientHeight; // Full scrollable height

    // Calculate the percentage of the scroll position relative to the full scroll height
    const scrollPercentage = (scrollPos / sectionHeight) * 100;

    // Adjust the step based on scroll percentage
    if (scrollPercentage < 25) {
      setCurrentStep(0);
    } else if (scrollPercentage < 50) {
      setCurrentStep(1);
    } else if (scrollPercentage < 75) {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  };

  // Educational section content helper variable
  const educationContent = [
    "All Ages",
    "Grow Skills, Earn Certificates",
    "Apply with Confidence",
    "Seek Stability",
  ];

  return (
    <div>
      {/* Landing Navigation */}
      <LandingNavBar />
      {/* Landing Section */}
      <div className="relative flex flex-col h-screen items-center justify-center bg-gray-100 p-6">
        {/* Fade-in Quote */}
        <div className="text-center animate-fadeIn">
          <Typography
            variant="h2"
            className="text-2xl md:text-5xl lg:text-6xl font-bold text-blueCustom leading-relaxed font-bebas"
            style={{ WebkitTextStroke: "1px black" }}
          >
            "The future belongs to those who believe in <br />
            the beauty of their dreams."
          </Typography>

          {/* Eleanor Roosevelt Signature */}
          <div className="mt-4 flex justify-end w-full">
            <Typography
              variant="h6"
              className="text-right text-blueCustom animate-writeSignature overflow-hidden inline-block whitespace-nowrap"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "2rem",
                width: "0%",
              }}
            >
              - Eleanor Roosevelt
            </Typography>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="aboutSection" className="py-16 text-center bg-white">
        <Typography variant="h4" className="mb-8">
          About Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Mission */}
          <Grid
            item
            xs={12}
            sm={4}
            ref={aboutRef1}
            className={`${aboutInView1 ? "animate-floatUp" : "opacity-0"}`}
          >
            <div className="flex flex-col items-center">
              <Avatar className="w-20 h-20 bg-yellow-500">📘</Avatar>
              <Typography variant="h6" className="mt-4">
                Mission
              </Typography>
              <Typography variant="body1">
                We aim to inspire and empower the individuals who experienced
                barriers.
              </Typography>
            </div>
          </Grid>

          {/* Education */}
          <Grid
            item
            xs={12}
            sm={4}
            ref={aboutRef2}
            className={`${aboutInView2 ? "animate-floatUp delay-200" : "opacity-0"}`}
          >
            <div className="flex flex-col items-center">
              <Avatar className="w-20 h-20 bg-yellow-500">🎓</Avatar>
              <Typography variant="h6" className="mt-4">
                Education
              </Typography>
              <Typography variant="body1">
                Providing world-class resources for career growth.
              </Typography>
            </div>
          </Grid>

          {/* Careers */}
          <Grid
            item
            xs={12}
            sm={4}
            ref={aboutRef3}
            className={`${aboutInView3 ? "animate-floatUp delay-400" : "opacity-0"}`}
          >
            <div className="flex flex-col items-center">
              <Avatar className="w-20 h-20 bg-yellow-500">💼</Avatar>
              <Typography variant="h6" className="mt-4">
                Careers
              </Typography>
              <Typography variant="body1">
                Connecting talent with leading global companies.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>

      <div id="careersSection" className="py-16 bg-gray-100">
        <Typography variant="h4" className="text-center mb-8">
          Job Opportunities
        </Typography>
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          {/* First Image */}
          <div className="flex items-center justify-center">
            <img
              src={DaBomb}
              alt="Job 1"
              className="max-w-full max-h-80 object-contain"
            />
          </div>
          {/* Second Image  */}
          <div className="flex items-center justify-center">
            <img
              src={DirtFlowers}
              alt="Job 2"
              className="max-w-[70%] max-h-72 object-contain"
            />
          </div>
          {/* Third Image */}
          <div className="flex items-center justify-center">
            <img
              src={HomeDepot}
              alt="Job 3"
              className="max-w-[50%] max-h-64 object-contain"
            />
          </div>
          {/* Fourth Image */}
          <div className="flex items-center justify-center">
            <img
              src={HEB}
              alt="Job 4"
              className="max-w-[90%] max-h-80 object-contain"
            />
          </div>
          {/* Fifth Image */}
          <div className="flex items-center justify-center">
            <img
              src={PointSkate}
              alt="Job 5"
              className="max-w-full max-h-80 object-contain"
            />
          </div>
          {/* Sixth Image */}
          <div className="flex items-center justify-center">
            <img
              src={SpinsterRecords}
              alt="Job 6"
              className="max-w-[60%] max-h-72 object-contain"
            />
          </div>
          {/* Seventh Image */}
          <div className="flex items-center justify-center">
            <img
              src={WhiteRockCoffee}
              alt="Job 7"
              className="max-w-[85%] max-h-80 object-contain"
            />
          </div>
          {/* Eighth Image */}
          <div className="flex items-center justify-center">
            <img
              src={WhiteRockSoap}
              alt="Job 8"
              className="max-w-full max-h-80 object-contain"
            />
          </div>
        </Carousel>
      </div>

      {/* Educational Section */}
      <div
        id="educationSection"
        className="relative h-screen flex items-center justify-center bg-white overflow-hidden"
        onScroll={handleScroll}
        style={{ overflowY: "scroll", scrollSnapType: "y mandatory" }}
      >
        <div className="text-center" style={{ height: "300vh" }}>
          <div
            style={{
              position: "sticky",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Typography variant="h4">
              {educationContent[currentStep]}
            </Typography>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div id="testimonialsSection" className="py-16 bg-gray-200">
        <Typography variant="h4" className="text-center mb-8">
          Testimonials
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <div className="flex items-center">
                  <Avatar src={stockWomanPhoto} className="mr-4" />
                  <Typography variant="body1">
                    "This platform has transformed my career path, opening doors
                    I never imagined." - Amy, 32
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <div className="flex items-center">
                  <Avatar src={stockOldManPhoto} className="mr-4" />
                  <Typography variant="body1">
                    "The resources available here helped me rehabiliate after
                    serving my country." - John, 58
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <div className="flex items-center">
                  <Avatar src={stockBoyPhoto} className="mr-4" />
                  <Typography variant="body1">
                    "I couldn't be happier with the support and guidance
                    provided by this platform." - Logan, 16
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            © 2023 ReBirth Empowerment Education. All Rights Reserved.
          </Typography>
        </Box>
      </footer>
    </div>
  );
};

export default Landing;
