import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dish, DishesList as DishesistProps } from "./interfaces";
import "./styles.css";

const DishesList: React.FC<DishesistProps> = ({ dishes }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<keyof Dish | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [selectedFilters, setSelectedFilters] = useState({
    diet: "",
    flavor: "",
    state: "",
    course: "",
  });
  const [filterOptions, setFilterOptions] = useState<{
    diet: string[];
    flavor: string[];
    state: string[];
    course: string[];
  }>({
    diet: [],
    flavor: [],
    state: [],
    course: [],
  });

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  useEffect(() => {
    const uniqueFilterOptions = {
      diet: Array.from(new Set(dishes.map((dish) => dish.diet)))
        .filter(Boolean)
        .sort(),
      flavor: Array.from(
        new Set(dishes.map((dish) => dish.flavor_profile || ""))
      )
        .filter(Boolean)
        .filter((option) => option !== "")
        .sort(),
      state: Array.from(new Set(dishes.map((dish) => dish.state || "")))
        .filter(Boolean)
        .filter((option) => option !== "")
        .sort(),
      course: Array.from(new Set(dishes.map((dish) => dish.course)))
        .filter(Boolean)
        .sort(),
    };

    setFilterOptions(uniqueFilterOptions);
  }, [dishes]);

  const handleSort = useCallback(
    (column: keyof Dish) => {
      if (column === sortColumn) {
        if (sortDirection === "asc") {
          setSortDirection("desc");
        } else {
          setSortColumn(null);
          setSortDirection(null);
        }
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    },
    [sortColumn, sortDirection]
  );

  const handleChangeFilter = useCallback((event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name as string]: value as string,
    }));
  }, []);

  const goToPage = useCallback(
    (dishName: string) => {
      navigate(`/dish/${encodeURIComponent(dishName)}`);
    },
    [navigate]
  );

  const sortedAndFilteredDishes = useMemo(() => {
    const filteredDishes = dishes.filter((dish) => {
      return (
        (selectedFilters.diet === "" || dish.diet === selectedFilters.diet) &&
        (selectedFilters.flavor === "" ||
          dish.flavor_profile === selectedFilters.flavor) &&
        (selectedFilters.state === "" ||
          dish.state === selectedFilters.state) &&
        (selectedFilters.course === "" ||
          dish.course === selectedFilters.course)
      );
    });

    return filteredDishes.sort((a, b) => {
      const valueA = sortColumn ? a[sortColumn] : null;
      const valueB = sortColumn ? b[sortColumn] : null;

      if (valueA === null && valueB === null) {
        return 0;
      } else if (valueA === null) {
        return sortDirection === "asc" ? 1 : -1;
      } else if (valueB === null) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortDirection === "asc"
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number);
      }
    });
  }, [dishes, sortColumn, sortDirection, selectedFilters]);

  const getSortIcon = useCallback(
    (column: keyof Dish) => {
      if (sortColumn === column) {
        return sortDirection === "asc" ? "\u2191" : "\u2193";
      }
      return null;
    },
    [sortColumn, sortDirection]
  );

  return (
    <>
      <div className="filterContainer">
        <p>Filters</p>
        <div className="dropdown-filters">
          <Select
            value={selectedFilters.diet}
            onChange={handleChangeFilter}
            name="diet"
            displayEmpty
            className="filter"
            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
          >
            <MenuItem value="">Select Diet</MenuItem>
            {filterOptions.diet.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={selectedFilters.flavor}
            onChange={handleChangeFilter}
            name="flavor"
            displayEmpty
            className="filter"
            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
          >
            <MenuItem value="">Select Flavor</MenuItem>
            {filterOptions.flavor.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={selectedFilters.state}
            onChange={handleChangeFilter}
            name="state"
            displayEmpty
            className="filter"
            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
          >
            <MenuItem value="">Select State</MenuItem>
            {filterOptions.state.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={selectedFilters.course}
            onChange={handleChangeFilter}
            name="course"
            displayEmpty
            className="filter"
            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
          >
            <MenuItem value="">Select Course</MenuItem>
            {filterOptions.course.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <h2>Dishes List</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                className="clickable-tablecell"
                onClick={() => handleSort("name")}
              >
                <strong>Name</strong>
                <span className="sortIcon">{getSortIcon("name")}</span>
              </TableCell>
              <TableCell>
                <strong>Ingredients</strong>
              </TableCell>
              <TableCell>
                <strong>Diet</strong>
              </TableCell>
              <TableCell
                className="clickable-tablecell"
                onClick={() => handleSort("prep_time")}
              >
                <strong>Preparation Time</strong>
                <span className="sortIcon">{getSortIcon("prep_time")}</span>
              </TableCell>
              <TableCell
                className="clickable-tablecell"
                onClick={() => handleSort("cook_time")}
              >
                <strong>Cooking Time</strong>
                <span className="sortIcon">{getSortIcon("cook_time")}</span>
              </TableCell>
              <TableCell>
                <strong>Flavor Profile</strong>
              </TableCell>
              <TableCell>
                <strong>Course</strong>
              </TableCell>
              <TableCell>
                <strong>State</strong>
              </TableCell>
              <TableCell>
                <strong>Region</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndFilteredDishes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dish, index) => (
                <TableRow
                  key={index}
                  onClick={() => goToPage(dish.name)}
                  className="tableRow"
                >
                  <TableCell>{dish.name}</TableCell>
                  <TableCell>{dish.ingredients}</TableCell>
                  <TableCell>{dish.diet}</TableCell>
                  <TableCell>
                    {dish.prep_time ? `${dish.prep_time} min` : "-"}
                  </TableCell>
                  <TableCell>
                    {dish.cook_time ? `${dish.cook_time} min` : "-"}
                  </TableCell>
                  <TableCell>
                    {dish.flavor_profile ? dish.flavor_profile : "-"}
                  </TableCell>
                  <TableCell>{dish.course}</TableCell>
                  <TableCell>{dish.state ? dish.state : "-"}</TableCell>
                  <TableCell>{dish.region ? dish.region : "-"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={sortedAndFilteredDishes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DishesList;
