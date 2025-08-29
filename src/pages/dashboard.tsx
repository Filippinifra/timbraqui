import { checkRouteReturnUser } from "@/auth/checkRouteReturnUserTranslations";
import { DashboardView } from "@/views/Dashboard";
import { GetServerSideProps } from "next";

const Dashboard = () => {
  return <DashboardView />;
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  checkRouteReturnUser(ctx);
