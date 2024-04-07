"use client";
import { useEffect, useState } from "react";

import { Form, Select } from "antd";
import { useQuery } from "@tanstack/react-query";

const FormItem = Form.Item;

export default function HorizontalFilter(props) {
  const { data } = useQuery({
    queryKey: ["api-common"],
  });
  const [optionsCategoryService, setOptionsCategoryService] = useState(
    data?.listService?.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    })
  );
  return (
    <FormItem name="category_service">
      <Select
        onChange={(value) => {
          //   setSelectedID(value);
          props.onChangeCategoryService(value);
        }}
        allowClear
        showSearch
        options={optionsCategoryService}
        getPopupContainer={() => document.getElementById("pin-search")}
        placeholder="Chọn dịch vụ"
        // filterOption={filterOption}
        dropdownAlign={{
          points: ["tl", "bl"], // align dropdown bottom-left to top-left of input element
          offset: [0, -4], // align offset
          overflow: {
            adjustX: 0,
            adjustY: 0, // do not auto flip in y-axis
          },
        }}
      />
    </FormItem>
  );
}
