import Navbar from "../../components/common/Navbar";
import AssessmentFlow from "../../components/candidate/assessment/AssessmentFlow";

export default function CandidateDashboardPage() {
  return (
    <div className="min-h-screen bg-[#fff5f8]">
      {/* Dashboard sidebar */}
      <Navbar />

      {/* Main content */}
      <main
        className="
          min-h-screen
          ml-[265px]
          px-6
          sm:px-10
          lg:px-14
          py-8
        "
      >
        <div className="max-w-[1100px] mx-auto">
          <AssessmentFlow />
        </div>
      </main>
    </div>
  );
}