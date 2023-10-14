import { Pagination, PaginationItem, useMediaQuery } from "@mui/material";

export default function PaginationComponent({
  pageCount,
  page,
  handleChange,
}: {
  pageCount: number;
  page: string | null;
  handleChange: (_: React.ChangeEvent<unknown>, value: number) => void;
}) {
  const matches = useMediaQuery("(max-width: 470px)");
  return (
    <Pagination
      count={pageCount}
      page={page ? +page : 1}
      onChange={handleChange}
      color="secondary"
      siblingCount={matches ? 0 : undefined}
      renderItem={(item) => (
        <PaginationItem {...item} sx={{ fontWeight: 600 }} />
      )}
      sx={{
        display: "center",
        justifyContent: "center",
        mt: { xs: 7, md: 12 },
        mb: 7,
        fontWeight: 600,
        "& .Mui-selected": {
          cursor: "default",
          pointerEvents: "none",
        },
      }}
    />
  );
}
