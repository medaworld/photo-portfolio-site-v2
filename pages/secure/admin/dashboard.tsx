import { onAuthStateChanged } from '@firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { auth, firestore } from '../../../lib/firebase';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import { fetchCategories } from '../../../utils/firebaseUtils';

const AdminDashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 55px);
  padding-top: 55px;
  background-color: ${(props) => props.theme.background};
`;

const DashboardCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;
  background-color: #fff;
`;

export default function AdminDashboard() {
  const [totalImages, setTotalImages] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalSubCategories, setTotalSubCategories] = useState(0);

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      const categories = await fetchCategories(firestore);
      setTotalCategories(categories.length);

      let imageCount = 0;
      let subCategoryCount = 0;
      for (let category of categories) {
        // imageCount += category.images.length;
        // subCategoryCount += category.subcategories.length;
      }

      setTotalImages(imageCount);
      setTotalSubCategories(subCategoryCount);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/work');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AdminDashboardContainer>
      <AdminSidebar />
      {user && (
        <DashboardCard>
          <h1>Welcome, Admin!</h1>
          <p>Total Images: {totalImages}</p>
          <p>Total Categories: {totalCategories}</p>
          <p>Total Subcategories: {totalSubCategories}</p>
        </DashboardCard>
      )}
    </AdminDashboardContainer>
  );
}
