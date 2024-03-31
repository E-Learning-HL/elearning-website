"use client";
import "@/src/style/detail.css";
import { Collapse, Row, Col } from "antd";
const { Panel } = Collapse;
export default function Price({ detailClinic }) {
  console.log("detailClinic", detailClinic)
  return (
    <div className="wp-price-detail">
      <Row gutter={[16, 16]}>
        {detailClinic?.category_service_clinic?.map((item) => (
          <Col xl={12} md={12} xs={24} sm={24}>
            <Collapse>
              <Panel
                header={item?.category_service?.name}
                key={item?.category_service?.id}
              >
                {item?.service.map((subItem) => (
                  <div className="wp-item-price">
                    <div className="first-line">
                      <div className="name-price">{subItem?.name}</div>
                      <div className="value-price">
                        {subItem?.amount?.toLocaleString("vi-VN")}{" "}
                        {subItem?.amount_max &&
                        subItem?.amount !== subItem?.amount_max
                          ? ` - ${subItem?.amount_max?.toLocaleString("vi-VN")}`
                          : ``}
                      </div>
                    </div>
                    <div className="second-line">
                      {subItem?.unit && (
                        <div className="guarantee">Đơn vị: {subItem?.unit}</div>
                      )}
                      {subItem?.guarantee && (
                        <div className="guarantee">
                          Bảo hành: {subItem?.guarantee}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
}
