import { Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home'
import WorkDetail from './pages/WorkDetail'
import { SlateProvider } from './components/Slate'
import { ScrollToTop } from './components/ScrollToTop'

export default function App() {
  const location = useLocation()

  return (
    <SlateProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* pathname 키로 작품 상세를 리마운트 — TimecodeGallery 스크럽,
            GradeSlider 위치, 라이트박스 등 페이지 내부 상태가
            이전 작품에서 새 작품으로 새어 나가지 않도록 초기화 */}
        <Route
          path="/work/:slug"
          element={<WorkDetail key={location.pathname} />}
        />
      </Routes>
    </SlateProvider>
  )
}
