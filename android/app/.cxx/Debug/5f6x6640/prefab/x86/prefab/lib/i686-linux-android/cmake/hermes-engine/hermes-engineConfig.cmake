if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "/Users/zecki/.gradle/caches/9.3.1/transforms/df72597deb83dc841612506ae2c31828/transformed/hermes-android-250829098.0.14-debug/prefab/modules/hermesvm/libs/android.x86/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/zecki/.gradle/caches/9.3.1/transforms/df72597deb83dc841612506ae2c31828/transformed/hermes-android-250829098.0.14-debug/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

