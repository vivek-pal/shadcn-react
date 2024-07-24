import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const CardWrapper = ({ label, title, children, className }) => {
  // xl:w-1/4 md:w-1/2 
  return (
    <Card className={className || "flex-1 shadow-md"}> 
      <CardHeader>
        {title && <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-muted-foreground text-sm">{label}</p>
        </div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          {label}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
