const Hello = () => {
  return (
    <>
      <div bg="blue hover:red" border="rounded-4" h="30" p="1" m="1" cursor="pointer">
        <h1>Hello</h1>
      </div>
      <button class="btn" color="red">
        Solidjs
      </button>
      <button m="1" text="lg white hover:(2xl black)" border="rounded-2 red-6" p="x-4 y-2" bg="red-4 hover:red-5" cursor-pointer>
        Test
      </button>
    </>
  );
};
export default Hello;
