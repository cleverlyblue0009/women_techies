import '../styles/globals.css';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-white px-4 pb-24">
      <div className="mx-auto max-w-md space-y-6">{children}</div>
    </div>
  );
};

export default Layout;
