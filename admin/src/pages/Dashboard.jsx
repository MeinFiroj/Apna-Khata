import { useState } from "react";
import TodayEntries from "./TodayEntries";
import FadeInContainer from "../components/shared/FadeInContainer";
import Hero from "../components/dashboard/Hero";
import Pending from "../components/entry/Pending";
import AddPayment from "../components/entry/AddPayment";
import OverdueCustomers from "../components/customer/OverdueCustomers";
import EntryButtons from "../components/entry/EntryButtons";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState(null);

  const openContent = (contentKey) => setActiveContent(contentKey);

  return (
    <div className="w-full">
      <FadeInContainer
        isActive={Boolean(activeContent)}
        setIsActive={() => setActiveContent(null)}
        content={activeContent}
      />

      <main className="p-(--pad-phone) md:p-(--pad-desk) pb-(--footer-space)">
        <Hero onOpen={openContent} />
        <section className="mt-(--pad-phone) grid gap-(--pad-phone) md:grid-cols-4 ">
            <EntryButtons openContent={openContent} />
          <TodayEntries />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
