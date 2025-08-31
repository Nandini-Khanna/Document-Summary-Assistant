import img from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "15px 30px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        fontSize: "1.2rem",
        fontWeight: "600",
      }}
    >
    <img src={img} alt="logo" style={{ height: "90px" }} />
    
    </nav>
  );
}
