export const PostContent = ({ content, imageUrl }) => {
  if (!content && !imageUrl) return null;

  return (
    <section className="mt-4">
      {content && (
        <p className="whitespace-pre-wrap break-words text-slate-700">
          {content}
        </p>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Post attachment"
          className="mt-4 max-h-[500px] w-full rounded-xl object-cover"
        />
      )}
    </section>
  );
};
