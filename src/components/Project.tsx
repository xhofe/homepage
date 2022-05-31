interface Props {
  name: string;
  desc: string;
  link: string;
  icon: string;
}

export const Project = (data: Props) => {
  return (
    <a
      class="px-4 py-3 text-current rounded-md transition-colors decoration-none"
      bg="gray-400/10 hover:gray-400/20 "
      href={data.link}
      target="_blank"
    >
      <div class="flex h-full items-center justify-center">
        <div flex-1>
          <div font-medium leading-relaxed>
            {data.name}
          </div>
          <div op-50 font-normal text-sm>
            {data.desc}
          </div>
        </div>
        <div ml-4 text-4xl op-80>
          <div class={data.icon} />
        </div>
      </div>
    </a>
  );
};
