import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../store";
import { fetchAllTests, deleteTest } from "../store/testsSlice";
import { Button, InputField, StatusBadge, ActionBtn } from "../components/ui";
import { getSubjectName, formatDate } from "../utils";

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { tests, loading, error } = useSelector(
    (state: RootState) => state.tests,
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllTests());
  }, [dispatch]);

  const filtered = tests.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await dispatch(deleteTest(id)).unwrap();
      toast.success("Test deleted successfully");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

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

      {/* Search */}
      <div className="max-w-sm mb-4">
        <InputField
          placeholder="Search by test name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
        ) : filtered.length === 0 ? (
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
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {[
                  "#",
                  "Test Name",
                  "Subject",
                  "Status",
                  "Created",
                  "Actions",
                ].map((col, i) => (
                  <th
                    key={col}
                    className={`px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide ${i === 5 ? "text-right" : "text-left"}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((test, i) => (
                <tr
                  key={test.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3.5 text-gray-400 w-10">{i + 1}</td>
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
                    <div className="flex items-center justify-end gap-1">
                      <ActionBtn
                        className="text-[#384EC7] hover:bg-blue-50"
                        onClick={() => navigate(`/tests/${test.id}/edit`)}
                      >
                        Edit
                      </ActionBtn>
                      <ActionBtn
                        className="text-gray-600 hover:bg-gray-100"
                        onClick={() => navigate(`/tests/${test.id}/preview`)}
                      >
                        View
                      </ActionBtn>
                      <ActionBtn
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(test.id, test.name)}
                      >
                        Delete
                      </ActionBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
