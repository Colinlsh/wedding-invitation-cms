import { FormikProps, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GuestModel, TableFilterFormProps } from "../app/models";
import { PaginationDto } from "../app/models/common";
import {
  getDashboard,
  getGuests,
  updateGuest,
} from "../app/slice/weddinginfoSlice";
import { RootState } from "../app/store";
import * as constants from "../app/utils/constants";
import LoadingBackdrop from "./ui/LoadingBackdrop";
import Table from "./ui/table/Table";
import * as Yup from "yup";

interface CountryBoardProps {}

const CountryBoard: React.FC<CountryBoardProps> = ({}) => {
  // #region redux
  const weddingInfoState = useAppSelector(
    (state: RootState) => state.weddingInfoState
  );
  const dispatch = useAppDispatch();

  let { slug: slug } = useParams();
  const [data, setData] = useState<PaginationDto>();
  const [paginateParams, setPaginateParams] = useState({
    country: slug!,
    currentPageNumber: 1,
    pageSize: 10,
    orderBy: "sortOrder",
    orderByDirection: "desc",
    searchString: "",
    isAttendingFilter: "",
    invitedBy: "",
  });
  // #endregion

  const handleSwipeRemove = (guest: GuestModel) => {
    dispatch(
      updateGuest({
        guest: { ...guest, isActive: false },
        paginateRequest: paginateParams,
      })
    );
  };

  const handleOnPageNumClick = (pageNum: number) => {
    dispatch(
      getGuests({
        ...paginateParams,
        currentPageNumber: pageNum,
        country: slug!,
      })
    );
    setPaginateParams({
      ...paginateParams,
      currentPageNumber: pageNum,
      country: slug!,
    });
  };

  const FilterByValidation = Yup.object({
    name: Yup.string()
      .min(2, "too short")
      .max(50, "too long")
      .matches(
        /^[-'a-z \u4e00-\u9eff]{1,50}$/i,
        "Only alphabets / chinese characters"
      ),
    pageSize: Yup.number()
      .typeError("you must specify a number")
      .positive()
      .lessThan(50, "Maximum 50 records")
      .moreThan(1, "Minimum 1 records"),
  });

  const filterInputFormik: FormikProps<TableFilterFormProps> =
    useFormik<TableFilterFormProps>({
      initialValues: {
        name: "",
        pageSize: 10,
        filterBy: "Yes/No",
      },
      validationSchema: FilterByValidation,
      onSubmit: (values, { resetForm }) => {
        console.log(values);

        setPaginateParams({
          ...paginateParams,
          searchString: values.name,
          pageSize: values.pageSize,
          isAttendingFilter:
            values.filterBy === "Yes"
              ? "true"
              : values.filterBy === "Yes/No"
              ? ""
              : "false",
        });

        dispatch(
          getGuests({
            ...paginateParams,
            currentPageNumber: 1,
            searchString: values.name,
            pageSize: values.pageSize,
            isAttendingFilter:
              values.filterBy === "Yes"
                ? "true"
                : values.filterBy === "Yes/No"
                ? ""
                : "false",
          })
        );
      },
    });

  useEffect(() => {
    if (slug !== undefined) {
      dispatch(
        getGuests({
          ...paginateParams,
          currentPageNumber: 1,
          pageSize: 10,
          orderBy: "sortOrder",
          orderByDirection: "desc",
          searchString: "",
          isAttendingFilter: "",
          invitedBy: "",
          country: slug!,
        })
      );

      setPaginateParams({
        ...paginateParams,
        currentPageNumber: 1,
        country: slug!,
      });

      setData(
        slug! === constants.SG
          ? weddingInfoState.singapore
          : weddingInfoState.malaysia
      );

      filterInputFormik.resetForm();

      if (
        weddingInfoState.dashboard === undefined ||
        weddingInfoState.dashboard!.my.expectedGuest === 0
      ) {
        dispatch(getDashboard());
      }
    }
  }, [slug!]);

  return (
    <div className="w-full h-full p-5">
      <h1 className="font-semibold py-5 h-fit flex space-x-2">
        {slug!.toLocaleLowerCase() === constants.SG ? (
          <div className="z-10">
            <img src="/assets/singapore.svg" alt="sg" className="h-5" />
          </div>
        ) : (
          <div className="z-10">
            <img src="/assets/malaysia.svg" alt="my" className="h-5" />
          </div>
        )}
        CountryBoard
      </h1>
      <div className="drop-shadow-xl rounded-lg h-[90%]">
        {data !== undefined ? (
          data!.isLoading ? (
            <LoadingBackdrop spinnerClassname="text-black" />
          ) : (
            <Table
              tableHeaders={
                slug! === constants.SG
                  ? [
                      "name",
                      "rsvp datetime",
                      "invited by",
                      "attending?",
                      "dietary preference",
                    ]
                  : ["name", "rsvp datetime", "invited by", "attending?"]
              }
              tableItems={
                slug! === constants.SG
                  ? weddingInfoState.singapore.items
                  : weddingInfoState.malaysia.items
              }
              pagination={
                slug! === constants.SG
                  ? weddingInfoState.singapore
                  : weddingInfoState.malaysia
              }
              onPageNumClick={handleOnPageNumClick}
              isFiltering={true}
              filterBy={["Yes/No", "Yes", "No"]}
              filterFormik={filterInputFormik}
              countryData={
                slug! === constants.SG
                  ? weddingInfoState.dashboard!.sg
                  : weddingInfoState.dashboard!.my
              }
              onSwipeRemove={handleSwipeRemove}
            />
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CountryBoard;
