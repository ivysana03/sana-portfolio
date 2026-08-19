type ReelIndicatorProps = {
  activeIndex: number;
  itemCount: number;
  itemLabel: string;
  sectionName: string;
  onPrevious: () => void;
  onNext: () => void;
};

export default function ReelIndicator({
  activeIndex,
  itemCount,
  itemLabel,
  sectionName,
  onPrevious,
  onNext,
}: ReelIndicatorProps) {
  const isSingleFrame = itemCount <= 1;

  return (
    <div className="reel-indicator" role="group" aria-label={`Browse ${sectionName} frames`}>
      <button
        className="reel-advance-button is-previous"
        type="button"
        disabled={isSingleFrame}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onPrevious();
        }}
        aria-label={`Previous ${itemLabel}`}
      >
        <span className="reel-frame-icon" aria-hidden="true"><i /><i /></span>
      </button>

      <div className={`reel-film-strip${isSingleFrame ? " is-single-frame" : ""}`}>
        <span className="reel-section-label" aria-hidden="true">{sectionName}</span>
        <span className="reel-sprockets" aria-hidden="true">
          {Array.from({ length: itemCount }, (_, index) => (
            <i className={index === activeIndex ? "is-active" : ""} key={index} />
          ))}
        </span>
        <span className="sr-only" aria-live="polite">
          {sectionName}, {itemLabel} {activeIndex + 1} of {itemCount}
        </span>
      </div>

      <button
        className="reel-advance-button is-next"
        type="button"
        disabled={isSingleFrame}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onNext();
        }}
        aria-label={`Next ${itemLabel}`}
      >
        <span className="reel-frame-icon" aria-hidden="true"><i /><i /></span>
      </button>
    </div>
  );
}
