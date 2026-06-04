import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../store";
import { fetchAllTests, deleteTest } from "../store/testsSlice";
import {
  Button,
  InputField,
  StatusBadge,
  DropdownMenu,
  ConfirmModal,
  Pagination,
} from "../components/ui";
import type { DropdownItem } from "../components/ui";
import { GridViewIcon, ListViewIcon } from "../assets/svgs";
import { getSubjectName, formatDate } from "../utils";
import { useDebounce } from "../hooks/useDebounce";
import TestCard from "../components/TestCard";

const PAGE_SIZE = 9;
type ViewMode = "grid" | "list";

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 3.5h10M5.5 3.5V2.5h3v1M11 3.5L10.25 12H3.75L3 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { tests, loading, error } = useSelector(
    (state: RootState) => state.tests,
  );

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 400);
  const fetchInitiated = useRef(false);

  useEffect(() => {
    if (!fetchInitiated.current) {
      fetchInitiated.current = true;
      dispatch(fetchAllTests());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!fetchInitiated.current) return;
    dispatch(fetchAllTests({ search: debouncedSearch || undefined }));
    setPage(1);
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalPages = Math.ceil(tests.length / PAGE_SIZE);
  const paginatedTests = tests.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await dispatch(deleteTest(deleteTarget.id)).unwrap();
      toast.success("Test deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const rowMenuItems = (id: string, name: string): DropdownItem[] => [
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: () => navigate(`/tests/${id}/edit`),
    },
    {
      label: "View",
      icon: <EyeIcon />,
      onClick: () => navigate(`/tests/${id}/preview`),
    },
    {
      label: "Delete",
      icon: <TrashIcon />,
      danger: true,
      onClick: () => setDeleteTarget({ id, name }),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">All Tests</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage and track your tests
          </p>
        </div>
        <Button
          className="w-auto!"
          style={{ padding: "8px 20px" }}
          onClick={() => navigate("/tests/create")}
        >
          + Create New Test
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 max-w-sm">
          <InputField
            placeholder="Search tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg shrink-0">
          {(["grid", "list"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`p-2 rounded-md transition-colors cursor-pointer outline-none border-0 ${
                viewMode === mode
                  ? "bg-white shadow-sm"
                  : "bg-transparent hover:bg-gray-200"
              }`}
            >
              {mode === "grid" ? (
                <GridViewIcon
                  color={viewMode === "grid" ? "#384EC7" : "#9CA3AF"}
                />
              ) : (
                <ListViewIcon
                  color={viewMode === "list" ? "#384EC7" : "#9CA3AF"}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-sm text-gray-400">
          Loading tests…
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-sm text-red-500">{error}</p>
          <Button
            variant="secondary"
            className="w-auto!"
            onClick={() => dispatch(fetchAllTests())}
          >
            Retry
          </Button>
        </div>
      ) : paginatedTests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-sm text-gray-400">
            {search
              ? "No tests match your search."
              : "No tests yet. Create your first test!"}
          </p>
          {!search && (
            <Button
              className="w-auto!"
              onClick={() => navigate("/tests/create")}
            >
              + Create New Test
            </Button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedTests.map((test, i) => (
            <TestCard
              key={test.id}
              test={test}
              index={(page - 1) * PAGE_SIZE + i + 1}
              onDelete={(id, name) => setDeleteTarget({ id, name })}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["#", "Test Name", "Subject", "Status", "Created", ""].map(
                  (col, i) => (
                    <th
                      key={i}
                      className={`px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide ${i === 5 ? "w-10" : "text-left"}`}
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedTests.map((test, i) => (
                <tr
                  key={test.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3.5 text-gray-400 w-10">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-gray-900">
                    {test.name}
                  </td>
                  <td className="px-4 py-3.5 text-gray-500">
                    {getSubjectName(test.subject)}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={test.status} />
                  </td>
                  <td className="px-4 py-3.5 text-gray-500">
                    {formatDate(test.created_at)}
                  </td>
                  <td className="px-4 py-3.5">
                    <DropdownMenu items={rowMenuItems(test.id, test.name)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && tests.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Test"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />
    </div>
  );
}
