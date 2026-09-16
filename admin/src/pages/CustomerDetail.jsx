import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserLedger } from "../api/UserApi";
import InrAmount from "../components/shared/InrAmount";
import { LogOut, Mail, Phone } from "lucide-react";
import { useUserData } from "../hooks/useContext";
import EntryButtons from "../components/entry/EntryButtons";
import Loader from "../components/shared/Loader";
import FadeInContainer from "../components/shared/FadeInContainer";
import CustomerHeader from "../components/customer/CustomerHeader";
import BalanceCard from "../components/customer/BalanceCard";
import BackButton from "../components/shared/BackButton";
import TransactionHistory from "../components/customer/TransactionHistory";
import Reminder from "../components/customer/Reminder";

const CustomerDetail = () => {
  const { overdue } = useUserData();
  const params = useParams();
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, SetLoadingMore] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 7;

  // Getting User from DB
  const getLedger = async () => {
    setInitialLoading(true);
    const res = await getUserLedger(params.id, page, limit);
    if (res.success) {
      setEntries(res.data.data.entries);
      if (res.data?.data?.user) {
        setUser(res.data.data.user);
      }
      setHasMore(page < res.data.pagination?.pageCount);
      setPage((prev) => prev + 1);
    } else {
      toast.error(res.message);
    }
    setInitialLoading(false);
  };

  const loadMoreEntries = async () => {
    SetLoadingMore(true);
    const res = await getUserLedger(params.id, page, limit);
    if (res.success) {
      setEntries((prev) => [...prev, ...res.data.data.entries]);
      setHasMore(page < res.data.pagination?.pageCount);
      setPage((prev) => prev + 1);
    } else {
      toast.error(res.message);
    }
    SetLoadingMore(false);
  };

  useEffect(() => {
    getLedger();
  }, [params.id]);

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  // Update Payment Status
  useEffect(() => {
    let balance = user?.totalBalance || 0;
    if (balance === 0) setPaymentStatus("settled");
    else if (overdue.some((e) => e._id === user._id))
      setPaymentStatus("overdue");
    else setPaymentStatus("pending");
  }, [paymentStatus, overdue, user]);

  // Open FadeInContainer
  const openContent = (contentKey) => setActiveContent(contentKey);

  if (initialLoading) return <Loader loading={initialLoading} />;
  return (
    <main className="overflow-y-auto min-h-0 h-full pb-(--footer-space)">
      <FadeInContainer
        isActive={Boolean(activeContent)}
        setIsActive={setActiveContent}
        content={activeContent}
        selectedUser={user}
      />
      <div className="p-(--pad-phone) md:p-(--pad-desk) pb-0!">
        <BackButton />
      </div>
      <section className="p-(--pad-phone) grid gap-4 md:grid-cols-2 md:p-(--pad-desk)">
        <CustomerHeader user={user} />
        <BalanceCard
          balance={user.totalBalance}
          paymentStatus={paymentStatus}
        />
        <EntryButtons openContent={openContent} />
      </section>
      <section className="w-full lg:flex lg:items-start lg:gap-10 lg:p-(--pad-desk)">
        <TransactionHistory
          entries={entries}
          setEntries={setEntries}
          hasMore={hasMore}
          loadMoreEntries={loadMoreEntries}
          loadingMore={loadingMore}
        />
        <Reminder user={user} />
      </section>
    </main>
  );
};

export default CustomerDetail;
