interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
}: ContainerProps) => {
  return (
    <div className={`container h-full mx-auto ${className}`}>{children}</div>
  );
};

export default Container;
