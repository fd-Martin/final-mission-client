import React from "react";
import Banner from "./Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import LatestBook from "./LatestBook/LatestBook";
import Loading from "../../Components/Loading/Loading";
import Coverage from "./Coverage/Coverage";
import AnimatedSection from "./AnimatedSection/AnimatedSection";
import useAxios from "../../hooks/useAxios";
import Process from "./Process/Process";
import WhyChoose from "../../Components/WhyFromUs/WhyChoose";
import ComMarquee from "./Marquee/ComMarquee";


const Home = () => {
  const axiosGeneral = useAxios();
  const { data: latestBooks = [], isLoading: dataLoading } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const res = await axiosGeneral.get(`/latest-books`);
      return res.data;
    },
  });

  const { data: mapData, isLoading: mapLoading } = useQuery({
    queryKey: ["mapData"],
    queryFn: async () => {
      const res = await axiosGeneral.get("/coverage");
      return res.data;
    },
  });

  const { data: allDataCount, isLoading: countLoading } = useQuery({
    queryKey: ["count-all-data"],
    queryFn: async () => {
      const res = await axiosGeneral.get("/all-data-count");
      return res.data;
    },
  });

  if (dataLoading || mapLoading || countLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <Loading />
      </div>
    );
  }
  return (
    <div className="max-w-11/12 mx-auto space-y-16">
      <Banner books={latestBooks}></Banner>
      <LatestBook books={latestBooks}></LatestBook>
      <Coverage mapData={mapData}></Coverage>      
      <WhyChoose></WhyChoose>
      <AnimatedSection allDataCount={allDataCount}></AnimatedSection>
      <Process></Process>
      <ComMarquee></ComMarquee>
    </div>
  );
};

export default Home;
