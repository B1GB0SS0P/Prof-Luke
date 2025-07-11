import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const CSVSearchComponent = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  // Path to your CSV file
  const TSV_FILE_PATH = "luke.tsv";

  useEffect(() => {
    const loadTSV = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Read the TSV file
        const response = await fetch(TSV_FILE_PATH);
        const tsvText = await response.text();

        // Parse TSV manually
        const lines = tsvText.split("\n").filter((line) => line.trim());

        if (lines.length > 0) {
          const parseTSVLine = (line) => {
            const result = [];
            let current = "";
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === "\t" && !inQuotes) {
                result.push(current.trim());
                current = "";
              } else {
                current += char;
              }
            }
            result.push(current.trim());
            return result;
          };

          const parsedData = lines.map(parseTSVLine);
          const cleanHeaders = parsedData[0].map((header) =>
            header.replace(/"/g, "").trim()
          );
          setHeaders(cleanHeaders);
          setCsvData(parsedData.slice(1));
        }
      } catch (err) {
        setError(
          "Failed to load TSV file. Please ensure the file exists and is accessible."
        );
        console.error("Error loading TSV:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTSV();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return csvData;

    return csvData.filter((row) => {
      return row.some((cell) => {
        if (cell === null || cell === undefined) return false;
        return cell.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [csvData, searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <Paper elevation={2} sx={{ p: 5, textAlign: "center" }}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Loading CSV data...
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Alert
          severity="error"
          icon={<ErrorIcon />}
          sx={{ textAlign: "center" }}
        >
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            Error Loading Data
          </Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        py: 3,
        bgcolor: theme.palette.header.background,
        borderRadius: 5,
      }}
    >
      {/* Search Bar */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 5,
          backgroundColor: theme.palette.search.background,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search across all columns..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={clearSearch} edge="end">
                  <ClearIcon sx={{ color: "white" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            input: { color: "white" }, // Text input
            "& .MuiInputBase-root": {
              color: "white", // Value text color
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white",
              opacity: 1, // Fully visible
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1.5, color: "white" }}
        >
          {searchTerm
            ? `Found ${filteredData.length} of ${csvData.length} rows`
            : `Showing all ${csvData.length} rows`}
        </Typography>
      </Paper>

      {/* Results Table */}
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 5,
          bgcolor: theme.palette.search.background,
          color: "white",
          minWidth: "920px",
        }}
      >
        {" "}
        {/* Fix the min width */}
        <Table stickyHeader>
          <TableHead sx={{}}>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    bgcolor: theme.palette.search.background,
                    fontSize: "20px",
                    color: theme.palette.search.text,
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={cell}
                  >
                    {cell || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredData.length === 0 && searchTerm && (
          <Box sx={{ p: 5, textAlign: "center" }}>
            <SearchIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No results found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search term
            </Typography>
          </Box>
        )}
      </TableContainer>
    </Container>
  );
};

export default CSVSearchComponent;
