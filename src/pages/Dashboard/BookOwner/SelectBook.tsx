import { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { debounce } from "lodash";
import { Book, BooksListResponse } from "@/Types/types";
import axios from "@/utils/axios";

type OptionType = Book | { customButton: true };

export default function AsyncAutocomplete({
  openAddModal,
  handleBookIdSelection,
  formErrors,
}: {
  openAddModal: () => void;
  handleBookIdSelection: (bookId: number) => void;
  formErrors?: string;
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setSelectedOption] = useState<Book | null>(null);

  const fetchOptions = debounce(async (inputValue: string) => {
    setLoading(true);
    try {
      const {
        data: { books },
      } = await axios.get<BooksListResponse>(`/books`, {
        params: { name: inputValue, authorName: inputValue },
      });

      setOptions(books);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    return () => {
      fetchOptions.cancel();
    };
  }, []);

  const handleButtonClick = () => {
    setOptions([]);
    openAddModal();
  };

  // Ensure that the button is always at the end
  const displayedOptions: OptionType[] = [...options, { customButton: true }];
  return (
    <div>
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onInputChange={(_event, value) => fetchOptions(value)}
        onFocus={() => options.length === 0 && fetchOptions("")}
        onChange={(_event, value) => {
          if (!(value && "customButton" in value)) {
            setSelectedOption(value as Book | null);
            if (value?.id) {
              handleBookIdSelection(value.id);
            }
          }
        }}
        getOptionLabel={(option) => ("name" in option ? option.name : "")}
        options={displayedOptions}
        loading={loading}
        isOptionEqualToValue={(option, value) =>
          (option as Book).id === (value as Book).id
        }
        renderOption={(props, option) =>
          "customButton" in option ? (
            <Box key={props.key}>
              <Divider key={"divider"} />
              <Button
                onClick={handleButtonClick}
                key={"custom-btn"}
                variant='contained'
                fullWidth
                sx={{
                  paddingBlock: "0.6rem",
                  marginTop: "1rem",
                }}
              >
                Add Book
              </Button>
            </Box>
          ) : (
            <Box component='li' {...props} key={option.id}>
              {(option as Book).name + " by " + option.authorName}
            </Box>
          )
        }
        renderInput={(params) => {
          return (
            <TextField
              error={!!formErrors}
              helperText={formErrors}
              {...params}
              label='Search book by name or author'
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          );
        }}
      />
    </div>
  );
}
