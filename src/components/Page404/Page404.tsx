import './Page404.scss';
import { FC } from 'react';
import { GrDocumentMissing } from 'react-icons/gr';

const Page404: FC = () => {
  return (
    <main className="boards-page">
      <div className="error-page-content">
        <section className="error__page">
          <GrDocumentMissing className="error__page--icon" size="6rem" />
          <h2 className="title">404 - Page Not Found</h2>
        </section>
      </div>
    </main>
  );
};

export default Page404;
