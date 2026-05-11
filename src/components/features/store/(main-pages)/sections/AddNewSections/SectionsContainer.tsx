import AddNewPopularSection from "./PopularSection/AddNewPopularSection";
import AddNewSpecialSection from "./SpecialSection/AddNewSpecialSection";
import AddNewCategorySection from "./CategorySection/AddNewCategorySection";
import PopularSectionContainer from "./PopularSection/PopularSectionContainer";
import CategorySection from "./CategorySection/CategorySection";
import SpecialSectionContainer from "./SpecialSection/SpecialSectionContainer";

type Props = {
  sections?: any;
};

const SectionsContainer: React.FC<Props> = ({ sections = [] }) => {
  const groupedSections = sections.reduce((acc: any, section: any) => {
    const type = section.section_type;

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(section);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="w-full flex flex-col gap-8">
        {sections.length ? (
          <>
            <PopularSectionContainer
              mostPopular={groupedSections?.most_popular?.[0]}
            />
            <CategorySection categories={groupedSections?.category_based} />

            <SpecialSectionContainer
              specialProducts={groupedSections?.special_products}
            />
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <AddNewPopularSection />
            <AddNewCategorySection />
            <AddNewSpecialSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionsContainer;
