import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      className="!p-5 shadow bg-slate-50 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img
        src="https://dn96iqv3kf32j.cloudfront.net/websitelogos/logo-icon.svg"
        alt="header-logo"
      />
    </div>
  );
};

export default Header;
