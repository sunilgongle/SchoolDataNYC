import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("fetches data on mount", async () => {
    const mockData = [
      {
        school_name: "Clinton School Writers & Artists, M.S. 260",
        dbn: "02M260",
        overview_paragraph: "Students who are prepared for college must have an education that encourages them to take risks as they produce and perform. Our college preparatory curriculum develops writers and has built a tight-knit community. Our school develops students who can think analytically and write creatively. Our arts programming builds on our 25 years of experience in visual, performing arts and music on a middle school level. We partner with New Audience and the Whitney Museum as cultural partners. We are a International Baccalaureate (IB) candidate school that offers opportunities to take college courses at neighboring universities.",
      },
      {
        school_name: "Liberation Diploma Plus High School	",
        dbn: "21K728",
        overview_paragraph: "The mission of Liberation Diploma Plus High School, in partnership with CAMBA, is to develop the student academically, socially, and emotionally. We will equip students with the skills needed to evaluate their options so that they can make informed and appropriate choices and create personal goals for success. Our year-round model (trimesters plus summer school) provides students the opportunity to gain credits and attain required graduation competencies at an accelerated rate. Our partners offer all students career preparation and college exposure. Students have the opportunity to earn college credit(s). In addition to fulfilling New York City graduation requirements, students are required to complete a portfolio to receive a high school diploma.",
      }
    ];

    axios.get.mockResolvedValue({ data: mockData });

    render(<App />);

    await waitFor(() => screen.getAllByRole("row"));

    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

  it("displays school data in a table format", () => {
    const mockData = [
      {
        school_name: "Clinton School Writers & Artists, M.S. 260",
        dbn: "02M260",
        overview_paragraph: "Students who are prepared for college must have an education that encourages them to take risks as they produce and perform. Our college preparatory curriculum develops writers and has built a tight-knit community. Our school develops students who can think analytically and write creatively. Our arts programming builds on our 25 years of experience in visual, performing arts and music on a middle school level. We partner with New Audience and the Whitney Museum as cultural partners. We are a International Baccalaureate (IB) candidate school that offers opportunities to take college courses at neighboring universities.",
      },
      {
        school_name: "Liberation Diploma Plus High School",
        dbn: "21K728",
        overview_paragraph: "The mission of Liberation Diploma Plus High School, in partnership with CAMBA, is to develop the student academically, socially, and emotionally. We will equip students with the skills needed to evaluate their options so that they can make informed and appropriate choices and create personal goals for success. Our year-round model (trimesters plus summer school) provides students the opportunity to gain credits and attain required graduation competencies at an accelerated rate. Our partners offer all students career preparation and college exposure. Students have the opportunity to earn college credit(s). In addition to fulfilling New York City graduation requirements, students are required to complete a portfolio to receive a high school diploma.",
      }
    ];

    axios.get.mockResolvedValue({ data: mockData });

    render(<App />);

    expect(screen.getByText("Clinton School Writers & Artists, M.S. 260")).toBeInTheDocument();
    expect(screen.getByText("02M260")).toBeInTheDocument();
    expect(screen.getByText("Students who are prepared for college must have an education that encourages them to take risks as they produce and perform. Our college preparatory curriculum develops writers and has built a tight-knit community. Our school develops students who can think analytically and write creatively. Our arts programming builds on our 25 years of experience in visual, performing arts and music on a middle school level. We partner with New Audience and the Whitney Museum as cultural partners. We are a International Baccalaureate (IB) candidate school that offers opportunities to take college courses at neighboring universities.")).toBeInTheDocument();
    expect(screen.getByText("Liberation Diploma Plus High School")).toBeInTheDocument();
    expect(screen.getByText("21K728")).toBeInTheDocument();
    expect(screen.getByText("The mission of Liberation Diploma Plus High School, in partnership with CAMBA, is to develop the student academically, socially, and emotionally. We will equip students with the skills needed to evaluate their options so that they can make informed and appropriate choices and create personal goals for success. Our year-round model (trimesters plus summer school) provides students the opportunity to gain credits and attain required graduation competencies at an accelerated rate. Our partners offer all students career preparation and college exposure. Students have the opportunity to earn college credit(s). In addition to fulfilling New York City graduation requirements, students are required to complete a portfolio to receive a high school diploma.")).toBeInTheDocument();
  });

  it("displays additional information when a school data row is clicked", async () => {
    const mockData = [
      {
        school_name: "Clinton School Writers & Artists, M.S. 260",
        dbn: "02M260",
        overview_paragraph: "Students who are prepared for college must have an education that encourages them to take risks as they produce and perform. Our college preparatory curriculum develops writers and has built a tight-knit community. Our school develops students who can think analytically and write creatively. Our arts programming builds on our 25 years of experience in visual, performing arts and music on a middle school level. We partner with New Audience and the Whitney Museum as cultural partners. We are a International Baccalaureate (IB) candidate school that offers opportunities to take college courses at neighboring universities.",
      },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    render(<App />);

    await waitFor(() => screen.getAllByRole("row"));

    const row = screen.getAllByRole("row")[1];
    row.click();

    expect(screen.getByText("Overview paragraph")).toBeInTheDocument();
  });
});