<template>
  <div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-full">
        <thead class="bg-gray-200">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">
              <p>Trx Id</p>
            </td>
            <td class="py-4 px-4">Ref Id</td>
            <td class="py-4 px-4">
              <p>Event</p>
            </td>
            <td class="py-4 px-4">
              <p>Data</p>
            </td>
            <td class="py-4 px-4">
              <p>Created</p>
            </td>
          </tr>
        </thead>
        <tbody v-if="log.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>

        <tbody v-if="!log.loading && log.data">
          <tr
            v-for="(l, i) in data"
            :key="i"
            class="tr"
          >
            <td class="p-4">#{{ l.id }}</td>
            <td class="p-4">{{ l.trx_id }}</td>
            <td class="p-4">{{ l.ref_id }}</td>
            <td class="p-4">{{ l.event }}</td>
            <td class="p-4">
              <Json :data="l.data" />
            </td>
            <td class="p-4">{{ useMomentDate(l.created_at) }}</td>
          </tr>
        </tbody>
        <tbody v-if="!log.length && !log.loading">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p class="text-xs">{{ log.error }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { useLogTrx } from "@/store/log";
export default {
  props: ["reff", "reloads"],
  setup() {
    const log = useLogTrx();
    return {
      log,
    };
  },
  watch: {
    reloads: {
      handler(v) {
        this.log.getData(this.reff);
      },
    },
  },
  computed: {
    data() {
      let dt = [];
      for (let i = 0; i < this.log.data.length; i++) {
        const element = this.log.data[i];
        element.data = this.parse(element.data);
        if (element.data.respon) {
          element.data.respon = this.parse(element.data.respon);
        }
        if (element.data.send_to_vendor) {
          element.data.send_to_vendor = this.parse(element.data.send_to_vendor);
        }
        dt.push(element);
      }
      return dt;
    },
  },

  mounted() {
    this.log.getData(this.reff);
  },

  methods: {
    parse(val) {
      try {
        return JSON.parse(val);
      } catch (error) {
        return { data: "-" };
      }
    },
  },
};
</script>
