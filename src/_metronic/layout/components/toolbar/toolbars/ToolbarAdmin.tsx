import { FC, useEffect, useState } from "react";
import { KTIcon } from "../../../../helpers";

const ToolbarAdmin: FC = () => {
  const [progress, setProgress] = useState<string>("1");
  useEffect(() => {
    document.body.setAttribute("data-kt-app-toolbar-fixed", "true");
  }, []);
  return null
  return (
    <div className="d-flex align-items-center gap-2">
      {/* begin::Action wrapper */}
      <div className="d-flex align-items-center">
        {/* begin::Label */}
        <span className="fs-7 text-gray-700 fw-bold pe-3 d-none d-md-block">
          Quick Tools:
        </span>
        {/* end::Label */}

        {/* begin::Actions */}
        <div className="d-flex">
          {/* begin::Action */}
          <a
            href="#"
            className="btn btn-sm btn-icon btn-icon-muted btn-active-icon-success"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-placement="top"
            title="Add new page"
          >
            <KTIcon iconName="files" className="fs-2x" />
          </a>
          {/* end::Action */}

          {/* begin::Action */}
          <a
            href="#"
            className="btn btn-sm btn-icon btn-icon-muted btn-active-icon-success"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-placement="top"
            title="Add new category"
          >
            <KTIcon iconName="add-files" className="fs-2x" />
          </a>
          {/* end::Action */}

          {/* begin::Action */}
          <a
            href="#"
            className="btn btn-sm btn-icon btn-icon-muted btn-active-icon-success"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-placement="top"
            title="Add new section"
          >
            <KTIcon iconName="search-list" className="fs-2x" />
          </a>
          {/* end::Action */}
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Action wrapper */}
    </div>
  );
};

export { ToolbarAdmin };
