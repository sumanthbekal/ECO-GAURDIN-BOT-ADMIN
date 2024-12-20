import React, { useEffect, useLayoutEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./Left.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import BotCard from "@/components/LeftCards/BotCard";
import { Bots } from "../assets/Data";
import NotificationCard from "@/components/LeftCards/NotificationCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TdsCard from "@/components/LeftCards/TdsCard";
import SoilErosionCard from "@/components/LeftCards/SoilErosionCard";
import PhValue from "@/components/LeftCards/PhValue";

function Left() {
  let [BotsData, setBotsData] = useState([]);
  let [SortBotsStatus, setSortBotsStatus] = useState("All");
  // let [BotDataBasedStatus, setBotDataBasedStatus] = useState([]);

  useEffect(() => {
    // setBotsData(Bots);
    // SortBotsAccordingToStatus(Bots);
    // setBotDataBasedStatus(SortBotsAccordingToStatus(SortBotsStatus));
  }, []);
  useEffect(() => {
    setBotsData(SortBotsAccordingToStatus(SortBotsStatus));
  }, [SortBotsStatus]);

  const SortBotsAccordingToStatus = (status) => {
    if (status === "Inactive") status = "Not Active";
    if (status === "All") {
      let BotsActive = Bots.filter((bot) => {
        return bot.status === "Active";
      });
      let BotsInactive = Bots.filter((bot) => {
        return bot.status === "Not Active";
      });
      return [...BotsActive, ...BotsInactive];
    } else {
      return BotsData.filter((bot) => {
        return bot.status === status;
      });
    }
  };
  return (
    <>
      <div className="head col-span-1 hidden lg:block">
        <Tabs defaultValue="notifications" className="">
          {" "}
          {/* border-none bg-none */}
          {/* //nav button */}
          <ScrollArea className="h-auto w-full rounded-md"  hideScrollBar={true}>
            <TabsList className="flex h-16 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
              <TabsTrigger className="h-10 min-w-max px-4" value="notifications">
                Notifications
              </TabsTrigger>
              <TabsTrigger className="h-10 min-w-max px-4" value="bots">
                Bots
              </TabsTrigger>
              <TabsTrigger className="h-10 min-w-max px-4" value="ph_value">
                PH Value
              </TabsTrigger>
              <TabsTrigger className="h-10 min-w-max px-4" value="tds_value">
                TDS
              </TabsTrigger>
              <TabsTrigger className="h-10 min-w-max px-4" value="soil_erosion">
                Soil Erosion
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          {/* //nav content area */}
          <div className="left__tabs__content_container h-[calc(100vh-64px)] w-[100%] overflow-y-auto">
            <ScrollArea className="h-full w-[100%] rounded-md">
              <TabsContent value="notifications">
                <Select
                  onValueChange={(a) => {
                    // setSortBotsStatus(a);
                  }}
                >
                  <SelectTrigger className="mt-3 w-[280px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Unresolved">Unresolved</SelectItem>
                    <SelectItem value="resolved_then_unresolved">Resolved Then Unresolved</SelectItem>
                    <SelectItem value="unresolved_then_resolved">Unresolved Then Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
              </TabsContent>

              <TabsContent value="bots">
                <Select
                  onValueChange={(a) => {
                    // setSortBotsStatus(a);
                  }}
                >
                  <SelectTrigger className="mt-3 w-[180px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                {BotsData.map((bot) => (
                  <BotCard key={bot.id} {...bot} />
                ))}
              </TabsContent>
              <TabsContent value="ph_value">
                <PhValue />
              </TabsContent>
              <TabsContent value="tds_value">
                <TdsCard />
              </TabsContent>
              <TabsContent value="soil_erosion">
                <SoilErosionCard />
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </div>
    </>
  );
}

export default Left;
