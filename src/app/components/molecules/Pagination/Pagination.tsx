"use client";

import React from "react";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  return <SeeMoreButton currentPage={currentPage} totalPages={totalPages} />;
};

export default Pagination;
