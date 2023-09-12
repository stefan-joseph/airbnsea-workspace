import { Box, IconButton } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Property } from "csstype";

export const PhotoCarousel = ({
  photos,
  showArrowButtons,
  aspectRatio,
}: {
  photos: string[];
  showArrowButtons?: boolean;
  aspectRatio?: Property.AspectRatio;
}) => {
  const CarouselArrowButton = ({
    clickHandler,
    isNext,
    isShowing,
  }: {
    clickHandler: () => void;
    isNext?: boolean;
    isShowing: boolean;
  }) => {
    const Icon = (props: any) =>
      isNext ? <IoIosArrowForward {...props} /> : <IoIosArrowBack {...props} />;

    return (
      <IconButton
        onClick={(e) => {
          clickHandler();
          e.stopPropagation();
        }}
        sx={{
          width: 32,
          height: 32,
          backgroundColor: "rgb(255, 255, 255, 0.8)",
          display: showArrowButtons && isShowing ? "inline-flex" : "none",
          position: "absolute",
          top: "50%",
          left: isNext ? undefined : 28,
          right: isNext ? 28 : undefined,
          transform: `translateY(-50%) translateX(${isNext ? "" : "-"}50%)`,
          zIndex: 1,
          animation: "400ms fadeIn",
          transition: "width 200ms, height 200ms, background-color 200ms",
          "&:hover": {
            backgroundColor: "rgb(255, 255, 255, 0.9)",
            width: 33,
            height: 33,
          },
        }}
      >
        <Icon size={16} color="info" />
      </IconButton>
    );
  };

  return (
    <Box position="relative">
      <Carousel
        showThumbs={false}
        showStatus={false}
        renderIndicator={(_, isSelected, index) => (
          <Box
            width={isSelected ? 8 : 6}
            height={isSelected ? 8 : 6}
            margin={0.6}
            display="inline-block"
            borderRadius="50%"
            sx={{
              backgroundColor: isSelected
                ? "rgb(255, 255, 255, 1)"
                : "rgb(255, 255, 255, 0.6)",
              transform: "translateY(50%)",
              transition: "width 200ms, height 200ms",
            }}
          ></Box>
        )}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <CarouselArrowButton
            clickHandler={clickHandler}
            isShowing={hasPrev}
          />
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <CarouselArrowButton
            clickHandler={clickHandler}
            isNext
            isShowing={hasNext}
          />
        )}
      >
        {photos.map((photo, index) => (
          <Box
            key={index}
            component="img"
            src={photo}
            sx={{
              aspectRatio: aspectRatio || "1/1",
              objectFit: "cover",
              width: "100%",
              overflow: "hidden",
              borderRadius: 4,
            }}
          />
        ))}
      </Carousel>
    </Box>
  );
};
