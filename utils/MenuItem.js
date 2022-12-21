import {
  UserGroupIcon,
  ServerIcon,
  UserIcon,
  DocumentIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function MenuItem({ open, icon, route, menuItem }) {
  console.log(open);
  console.log(menuItem);
  let showIcon;
  switch (icon) {
    case "userGroup":
      showIcon = <UserGroupIcon className="w-6" />;
      break;
    case "user":
      showIcon = <UserIcon className="w-6" />;
      break;
    case "server":
      showIcon = <ServerIcon className="w-6" />;
      break;
    case "document":
      showIcon = <DocumentIcon className="w-6" />;
      break;
    case "documentChart":
      showIcon = <DocumentChartBarIcon className="w-6" />;
      break;
    case "documentCheck":
      showIcon = <DocumentCheckIcon className="w-6" />;
      break;
    case "clipBoardDocument":
      showIcon = <ClipboardDocumentListIcon className="w-6" />;
      break;
    default:
      <UserGroupIcon className="w-8" />;
  }

  return (
    <Link href={route}>
      <div className="flex flex-row items-center gap-2">
        <div className="hover:bg-slate-700 hover:text-gray-200 hover:transition hover:duration-150 rounded-md p-5">
          {showIcon}
        </div>
        {open && <div>{menuItem}</div>}
      </div>
    </Link>
  );
}

export default MenuItem;
