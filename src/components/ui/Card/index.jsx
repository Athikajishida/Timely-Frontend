// components/ui/Card/index.jsx

const Card = ({ children, className = "" }) => {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardHeader = ({ children, className = "" }) => {
    return (
      <div className={`mb-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardTitle = ({ children, className = "" }) => {
    return (
      <h3 className={`text-lg font-semibold ${className}`}>
        {children}
      </h3>
    );
  };
  
  const CardContent = ({ children, className = "" }) => {
    return (
      <div className={`${className}`}>
        {children}
      </div>
    );
  };
  
  export { Card, CardHeader, CardTitle, CardContent };