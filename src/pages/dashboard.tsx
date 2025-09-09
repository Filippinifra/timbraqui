import { checkRouteAndRedirect } from "@/auth/checkRouteAndRedirect";
import { DashboardView } from "@/views/Dashboard";
import { GetServerSideProps } from "next";

const Dashboard = () => {
  return <DashboardView />;
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  checkRouteAndRedirect(ctx);
