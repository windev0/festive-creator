function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/assets/images/no_image.png";
      }}
      {...props}
    />
  );
}

export default Image;
