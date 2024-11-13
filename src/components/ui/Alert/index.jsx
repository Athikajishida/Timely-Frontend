// components/ui/Alert/index.jsx
const Alert = ({ children, variant = "default", className = "" }) => {
    const variants = {
      default: "bg-blue-50 border-blue-200 text-blue-700",
      destructive: "bg-red-50 border-red-200 text-red-700",
      success: "bg-green-50 border-green-200 text-green-700",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-700"
    };
  
    return (
      <div className={`border rounded-lg p-4 ${variants[variant]} ${className}`}>
        {children}
      </div>
    );
  };
  
  const AlertDescription = ({ children, className = "" }) => {
    return (
      <div className={`text-sm ${className}`}>
        {children}
      </div>
    );
  };
  
  export { Alert, AlertDescription };