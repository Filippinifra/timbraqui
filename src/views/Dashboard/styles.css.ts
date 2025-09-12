import { style } from "@vanilla-extract/css";

export const disabledAccountCard = style({
  textAlign: "center",
  margin: "auto",
  padding: "3rem 2rem",
  maxWidth: "500px",
  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  borderRadius: "20px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
  border: "1px solid #e2e8f0",
});

export const disabledAccountIcon = style({
  background: "linear-gradient(45deg, #ef4444, #dc2626)",
  borderRadius: "50%",
  width: "80px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 1.5rem auto",
});

export const loadingContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  borderRadius: "20px",
  border: "1px solid #e2e8f0",
});

export const loadingSpinner = style({
  width: "60px",
  height: "60px",
  border: "4px solid #e2e8f0",
  borderTop: "4px solid #3b82f6",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "0 auto 1rem auto",
});

export const errorCard = style({
  textAlign: "center",
  padding: "3rem 2rem",
  background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
  borderRadius: "20px",
  border: "1px solid #fecaca",
});

export const errorIcon = style({
  background: "linear-gradient(45deg, #ef4444, #dc2626)",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 1rem auto",
});

export const warningCard = style({
  textAlign: "center",
  padding: "3rem 2rem",
  background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
  borderRadius: "20px",
  border: "1px solid #fbbf24",
});

export const warningIcon = style({
  background: "linear-gradient(45deg, #f59e0b, #d97706)",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 1rem auto",
});

export const welcomeSection = style({
  background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
  borderRadius: "20px",
  padding: "2.5rem",
  marginBottom: "2rem",
  color: "white",
  position: "relative",
  overflow: "hidden",
});

export const welcomeBlur1 = style({
  position: "absolute",
  top: "-50px",
  right: "-50px",
  width: "200px",
  height: "200px",
  background: "rgba(255,255,255,0.1)",
  borderRadius: "50%",
  filter: "blur(40px)",
});

export const welcomeBlur2 = style({
  position: "absolute",
  bottom: "-30px",
  left: "-30px",
  width: "150px",
  height: "150px",
  background: "rgba(59,130,246,0.2)",
  borderRadius: "50%",
  filter: "blur(30px)",
});

export const welcomeContent = style({
  position: "relative",
  zIndex: 1,
});

export const welcomeHeader = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1rem",
});

export const welcomeLogo = style({
  background: "rgba(255,255,255,0.2)",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(10px)",
});

export const welcomeTitle = style({
  color: "white",
  margin: 0,
  background: "linear-gradient(45deg, #60a5fa, #a78bfa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const organizationContent = style({
  background: "#f8fafc",
  borderRadius: "12px",
  padding: "1rem",
  border: "1px solid #e2e8f0",
});
